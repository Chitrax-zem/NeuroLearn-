from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class KnowledgePackCreate(BaseModel):
    title: str
    subject: str
    description: Optional[str] = None
    difficulty: str = "Intermediate"
    is_public: bool = False
    tags: Optional[List[str]] = None


class KnowledgePackOut(BaseModel):
    id: str
    owner_id: str
    title: str
    subject: str
    description: Optional[str]
    difficulty: str
    is_public: bool
    downloads: int
    rating: float
    rating_count: int
    summary: Optional[str]
    flashcards: Optional[Any]
    tags: Optional[Any]
    created_at: datetime

    class Config:
        from_attributes = True


class UploadResponse(BaseModel):
    pack_id: str
    title: str
    chunks_created: int
    flashcards_count: int
    quiz_questions_count: int
    summary: str
    message: str
