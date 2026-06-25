from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base


class KnowledgePack(Base):
    __tablename__ = "knowledge_packs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    difficulty = Column(String, default="Intermediate")
    is_public = Column(Boolean, default=False)
    downloads = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    faiss_index_id = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    flashcards = Column(JSON, nullable=True)
    tags = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="knowledge_packs")
    chunks = relationship("DocumentChunk", back_populates="pack", cascade="all, delete-orphan")
    quizzes = relationship("Quiz", back_populates="pack", cascade="all, delete-orphan")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    pack_id = Column(String, ForeignKey("knowledge_packs.id"), nullable=False)
    content = Column(Text, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    source_page = Column(Integer, nullable=True)
    faiss_id = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    pack = relationship("KnowledgePack", back_populates="chunks")
