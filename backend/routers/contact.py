from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..models.contact import ContactSubmission
from typing import List

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactSubmissionResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    submitted_at: datetime

    class Config:
        from_attributes = True

@router.post("/submit")
async def submit_contact_form(form_data: ContactForm, db: Session = Depends(get_db)):
    try:
        # Create new contact submission
        new_submission = ContactSubmission(
            name=form_data.name,
            email=form_data.email,
            subject=form_data.subject,
            message=form_data.message,
            submitted_at=datetime.utcnow()
        )
        
        # Add to database
        db.add(new_submission)
        db.commit()
        db.refresh(new_submission)

        return {"status": "success", "message": "Contact form submitted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/submissions", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions(db: Session = Depends(get_db)):
    try:
        submissions = db.query(ContactSubmission).order_by(ContactSubmission.submitted_at.desc()).all()
        return submissions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 