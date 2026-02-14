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

load_dotenv()

app = FastAPI(title="Justrite Romania API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://justriteromania.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "anthropic/claude-haiku-4.5")
CATALOGUE_DIR = "/app/public/catalogues"
SUBMISSIONS_FILE = "/app/backend/submissions.json"
CHAT_SESSIONS_FILE = "/app/backend/chat_sessions.json"

RAG_CHUNK_WORDS = 220
RAG_CHUNK_OVERLAP = 40
RAG_TOP_K = 5

rag_lock = threading.Lock()
rag_index: Optional[BM25Okapi] = None
rag_chunks: List[Dict[str, Any]] = []

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


def get_relevant_chunks(query: str) -> List[Dict[str, str]]:
    build_rag_index()
    if rag_index is None or not rag_chunks:
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
