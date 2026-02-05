from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
import os
import json

app = FastAPI(title="Justrite Romania API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Storage file
SUBMISSIONS_FILE = "/app/backend/submissions.json"

def load_submissions():
    if os.path.exists(SUBMISSIONS_FILE):
        with open(SUBMISSIONS_FILE, "r") as f:
            return json.load(f)
    return {"contacts": [], "surveys": []}

def save_submissions(data):
    with open(SUBMISSIONS_FILE, "w") as f:
        json.dump(data, f, indent=2, default=str)

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

@app.get("/api/submissions")
def get_submissions():
    """Admin endpoint to view all submissions"""
    return load_submissions()
