from sqlalchemy import Column, String, DateTime, Integer, Text, Date, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base


class StudyPlan(Base):
    __tablename__ = "study_plans"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    exam_date = Column(Date, nullable=True)
    hours_per_day = Column(Integer, default=2)
    subjects = Column(JSON, nullable=True)
    weekly_schedule = Column(JSON, nullable=True)
    daily_goals = Column(JSON, nullable=True)
    ai_recommendations = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="study_plans")
