from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from dotenv import load_dotenv
from pypdf import PdfReader
from rank_bm25 import BM25Okapi
from openai import OpenAI
import os
import json
import uuid
import re
import threading
import hashlib
import numpy as np

load_dotenv()

app = FastAPI(title="Justrite Romania API")

# CORS
# Get allowed origins from environment variable
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if ALLOWED_ORIGINS[0] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "anthropic/claude-haiku-4.5")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_EMBEDDING_MODEL = os.environ.get("OPENAI_EMBEDDING_MODEL", "text-embedding-3-large")


# Get the directory where server.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Fix paths to be relative
CATALOGUE_DIR = os.path.join(BASE_DIR, "..", "public", "catalogues")
SUBMISSIONS_FILE = os.path.join(BASE_DIR, "submissions.json")
CHAT_SESSIONS_FILE = os.path.join(BASE_DIR, "chat_sessions.json")
EMBEDDINGS_CACHE_FILE = os.path.join(BASE_DIR, "embeddings_cache.json")RAG_CHUNK_WORDS = 220
RAG_CHUNK_OVERLAP = 40
RAG_TOP_K = 5

rag_lock = threading.Lock()
rag_index: Optional[BM25Okapi] = None
rag_chunks: List[Dict[str, Any]] = []
embedding_lock = threading.Lock()
embedding_matrix: Optional[np.ndarray] = None
embedding_hash: Optional[str] = None

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str

class SurveyForm(BaseModel):
    userType: str
    firstName: str
    lastName: str
    company: str
    email: EmailStr
    postalCode: str
    phone: str
    additionalInfo: Optional[str] = None
    agreeMarketing: bool = False
    agreePrivacy: str

class ChatRequest(BaseModel):
    session_id: str
    message: str
    language: Optional[str] = "en"

# Storage helpers

def load_json_file(path: str, default_value):
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return default_value


def save_json_file(path: str, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2, default=str)


def load_submissions():
    return load_json_file(SUBMISSIONS_FILE, {"contacts": [], "surveys": []})


def save_submissions(data):
    save_json_file(SUBMISSIONS_FILE, data)


def load_chat_sessions():
    return load_json_file(CHAT_SESSIONS_FILE, {})


def save_chat_sessions(data):
    save_json_file(CHAT_SESSIONS_FILE, data)


def append_chat_message(session_id: str, role: str, content: str):
    sessions = load_chat_sessions()
    history = sessions.get(session_id, [])
    history.append({
        "id": str(uuid.uuid4()),
        "role": role,
        "content": content,
        "timestamp": datetime.now(timezone.utc).isoformat()
    })
    sessions[session_id] = history[-12:]
    save_chat_sessions(sessions)


def get_chat_history(session_id: str) -> List[Dict[str, str]]:
    sessions = load_chat_sessions()
    history = sessions.get(session_id, [])
    return [{"role": msg["role"], "content": msg["content"]} for msg in history]

# RAG helpers

def tokenize(text: str) -> List[str]:
    return re.findall(r"[a-zA-Z0-9]+", text.lower())


def chunk_text(text: str, source: str) -> List[Dict[str, str]]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = min(start + RAG_CHUNK_WORDS, len(words))
        chunk_words = words[start:end]
        chunk = " ".join(chunk_words)
        if chunk.strip():
            chunks.append({
                "id": str(uuid.uuid4()),
                "source": source,
                "text": chunk
            })
        start = end - RAG_CHUNK_OVERLAP
        if start < 0:
            start = 0
        if end == len(words):
            break
    return chunks


def load_catalogue_texts() -> List[Dict[str, str]]:
    documents = []
    if not os.path.exists(CATALOGUE_DIR):
        return documents
    for filename in os.listdir(CATALOGUE_DIR):
        if not filename.lower().endswith(".pdf"):
            continue
        file_path = os.path.join(CATALOGUE_DIR, filename)
        try:
            reader = PdfReader(file_path)
            full_text = ""
            for page in reader.pages:
                full_text += (page.extract_text() or "") + "\n"
            if full_text.strip():
                documents.append({"source": filename, "text": full_text})
        except Exception:
            continue
    return documents


def build_rag_index():
    global rag_index, rag_chunks
    with rag_lock:
        if rag_index is not None:
            return
        documents = load_catalogue_texts()
        chunks: List[Dict[str, str]] = []
        for doc in documents:
            chunks.extend(chunk_text(doc["text"], doc["source"]))
        rag_chunks = chunks
        if not rag_chunks:
            rag_index = None
            return
        tokenized_chunks = [tokenize(chunk["text"]) for chunk in rag_chunks]
        rag_index = BM25Okapi(tokenized_chunks)


def compute_chunks_hash(chunks: List[Dict[str, str]]) -> str:
    hasher = hashlib.md5()
    for chunk in chunks:
        hasher.update(chunk["text"].encode("utf-8"))
    return hasher.hexdigest()


def load_embeddings_cache() -> Optional[Dict[str, Any]]:
    if not os.path.exists(EMBEDDINGS_CACHE_FILE):
        return None
    try:
        with open(EMBEDDINGS_CACHE_FILE, "r") as f:
            return json.load(f)
    except Exception:
        return None


def save_embeddings_cache(cache_data: Dict[str, Any]) -> None:
    with open(EMBEDDINGS_CACHE_FILE, "w") as f:
        json.dump(cache_data, f)


def get_openai_client() -> OpenAI:
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    return OpenAI(api_key=OPENAI_API_KEY)


def build_embedding_index() -> None:
    global embedding_matrix, embedding_hash
    build_rag_index()
    if not rag_chunks:
        return
    with embedding_lock:
        if embedding_matrix is not None:
            return
        current_hash = compute_chunks_hash(rag_chunks)
        cache = load_embeddings_cache()
        if cache and cache.get("hash") == current_hash and cache.get("model") == OPENAI_EMBEDDING_MODEL:
            embedding_matrix = np.array(cache.get("embeddings", []), dtype=float)
            embedding_hash = current_hash
            if embedding_matrix.size:
                norms = np.linalg.norm(embedding_matrix, axis=1, keepdims=True)
                norms[norms == 0] = 1
                embedding_matrix = embedding_matrix / norms
            return

        client = get_openai_client()
        embeddings: List[List[float]] = []
        batch_size = 64
        texts = [chunk["text"] for chunk in rag_chunks]
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            response = client.embeddings.create(model=OPENAI_EMBEDDING_MODEL, input=batch)
            embeddings.extend([item.embedding for item in response.data])
        embedding_matrix = np.array(embeddings, dtype=float)
        if embedding_matrix.size:
            norms = np.linalg.norm(embedding_matrix, axis=1, keepdims=True)
            norms[norms == 0] = 1
            embedding_matrix = embedding_matrix / norms
        embedding_hash = current_hash
        save_embeddings_cache({
            "model": OPENAI_EMBEDDING_MODEL,
            "hash": current_hash,
            "embeddings": embeddings
        })


def get_query_embedding(query: str) -> Optional[np.ndarray]:
    if not OPENAI_API_KEY:
        return None
    client = get_openai_client()
    response = client.embeddings.create(model=OPENAI_EMBEDDING_MODEL, input=query)
    vector = np.array(response.data[0].embedding, dtype=float)
    norm = np.linalg.norm(vector)
    if norm == 0:
        return vector
    return vector / norm


def get_relevant_chunks(query: str) -> List[Dict[str, str]]:
    build_rag_index()
    if not rag_chunks:
        return []

    build_embedding_index()
    if embedding_matrix is not None and embedding_matrix.size:
        query_vector = get_query_embedding(query)
        if query_vector is not None:
            scores = embedding_matrix @ query_vector
            top_indices = np.argsort(scores)[::-1][:RAG_TOP_K]
            embedding_results = [rag_chunks[idx] for idx in top_indices if scores[idx] > 0]
            if embedding_results:
                return embedding_results

    if rag_index is None:
        return []
    tokens = tokenize(query)
    if not tokens:
        return []
    scores = rag_index.get_scores(tokens)
    ranked_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    top_indices = [idx for idx in ranked_indices[:RAG_TOP_K] if scores[idx] > 0]
    return [rag_chunks[idx] for idx in top_indices]


def format_context(chunks: List[Dict[str, str]]) -> str:
    if not chunks:
        return ""
    sections = []
    for chunk in chunks:
        sections.append(f"[Source: {chunk['source']}]\n{chunk['text']}")
    return "\n\n".join(sections)


def build_system_prompt(language: str, context: str) -> str:
    lang_instruction = "Respond in Romanian." if language == "ro" else "Respond in English."
    context_block = f"\n\nCONTEXT:\n{context}" if context else ""
    return (
        "You are the Justrite Safety Advisor for Justrite Romania S.R.L. "
        "Use the provided context from official product catalogues to answer accurately. "
        "If the answer is not in the context, say you don't have that information and suggest contacting sales.ro@justrite.com or +40 751 556 555. "
        "Cite relevant product names and standards when present. "
        f"{lang_instruction}"
        f"{context_block}"
    )


def get_openrouter_client() -> OpenAI:
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")
    headers = {"X-Title": "Justrite Romania Safety Advisor"}
    app_url = os.environ.get("APP_URL")
    if app_url:
        headers["HTTP-Referer"] = app_url
    return OpenAI(
        api_key=OPENROUTER_API_KEY,
        base_url="https://openrouter.ai/api/v1",
        default_headers=headers
    )

@app.get("/api/health")
def health_check():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.post("/api/contact")
def submit_contact(form: ContactForm):
    try:
        data = load_submissions()
        submission = {
            "id": len(data["contacts"]) + 1,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            **form.model_dump()
        }
        data["contacts"].append(submission)
        save_submissions(data)
        return {"success": True, "message": "Contact form submitted successfully", "id": submission["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/survey")
def submit_survey(form: SurveyForm):
    try:
        data = load_submissions()
        submission = {
            "id": len(data["surveys"]) + 1,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            **form.model_dump()
        }
        data["surveys"].append(submission)
        save_submissions(data)
        return {"success": True, "message": "STUD-E survey submitted successfully", "id": submission["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/safety-chat")
def safety_chat(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    relevant_chunks = get_relevant_chunks(payload.message)
    context = format_context(relevant_chunks)
    system_prompt = build_system_prompt(payload.language or "en", context)

    history = get_chat_history(payload.session_id)

    messages: List[Dict[str, str]] = [
        {"role": "system", "content": system_prompt},
        *history,
        {"role": "user", "content": payload.message}
    ]

    append_chat_message(payload.session_id, "user", payload.message)
    client = get_openrouter_client()

    def generate():
        full_response = ""
        try:
            stream = client.chat.completions.create(
                model=OPENROUTER_MODEL,
                messages=messages,
                stream=True,
                temperature=0.4,
                max_tokens=1200
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content if chunk.choices else None
                if delta:
                    full_response += delta
                    yield delta
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            if full_response:
                append_chat_message(payload.session_id, "assistant", full_response)

    return StreamingResponse(generate(), media_type="text/plain")

@app.get("/api/submissions")
def get_submissions():
    """Admin endpoint to view all submissions"""
    return load_submissions()
