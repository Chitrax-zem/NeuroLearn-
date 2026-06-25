from sqlalchemy import Column, String, DateTime, Integer, Float, Date, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base


class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    study_minutes = Column(Integer, default=0)
    questions_asked = Column(Integer, default=0)
    quizzes_completed = Column(Integer, default=0)
    average_quiz_score = Column(Float, default=0.0)
    xp_earned = Column(Integer, default=0)
    login_count = Column(Integer, default=0)
    pdf_uploads = Column(Integer, default=0)
    study_plans_created = Column(Integer, default=0)
    page_visits = Column(Integer, default=0)
    ai_sessions = Column(Integer, default=0)
    subject_breakdown = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="analytics")
