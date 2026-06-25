from pydantic import BaseModel
from typing import List, Optional


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    pack_id: str
    question: str
    history: Optional[List[ChatMessage]] = []


class Source(BaseModel):
    chunk_id: str
    content: str
    page: Optional[int]
    relevance_score: float


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
    pack_id: str
    tokens_used: Optional[int] = None
