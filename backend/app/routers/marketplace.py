from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.user import User
from app.models.knowledge_pack import KnowledgePack
from app.schemas.knowledge_pack import KnowledgePackOut, KnowledgePackCreate
from app.utils.auth import get_current_user
from typing import List, Optional

router = APIRouter()


@router.get("", response_model=List[KnowledgePackOut])
def list_packs(
    subject: Optional[str] = None,
    search: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: int = Query(20, le=100),
    offset: int = 0,
    db: Session = Depends(get_db),
):
    q = db.query(KnowledgePack).filter(KnowledgePack.is_public == True)
    if subject:
        q = q.filter(KnowledgePack.subject.ilike(f"%{subject}%"))
    if difficulty:
        q = q.filter(KnowledgePack.difficulty == difficulty)
    if search:
        q = q.filter(or_(
            KnowledgePack.title.ilike(f"%{search}%"),
            KnowledgePack.description.ilike(f"%{search}%"),
        ))
    return q.order_by(KnowledgePack.downloads.desc()).offset(offset).limit(limit).all()


@router.get("/{pack_id}", response_model=KnowledgePackOut)
def get_pack(pack_id: str, db: Session = Depends(get_db)):
    pack = db.query(KnowledgePack).filter(KnowledgePack.id == pack_id, KnowledgePack.is_public == True).first()
    if not pack:
        raise HTTPException(status_code=404, detail="Pack not found")
    pack.downloads += 1
    db.commit()
    db.refresh(pack)
    return pack


@router.get("/my/packs", response_model=List[KnowledgePackOut])
def my_packs(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(KnowledgePack).filter(KnowledgePack.owner_id == current_user.id).all()


@router.patch("/{pack_id}/publish")
def publish_pack(pack_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    pack = db.query(KnowledgePack).filter(KnowledgePack.id == pack_id, KnowledgePack.owner_id == current_user.id).first()
    if not pack:
        raise HTTPException(status_code=404, detail="Pack not found")
    pack.is_public = True
    db.commit()
    return {"message": "Pack published to marketplace"}


@router.delete("/{pack_id}")
def delete_pack(pack_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    pack = db.query(KnowledgePack).filter(KnowledgePack.id == pack_id, KnowledgePack.owner_id == current_user.id).first()
    if not pack:
        raise HTTPException(status_code=404, detail="Pack not found")
    from app.services.faiss_service import faiss_service
    faiss_service.delete_index(pack_id)
    db.delete(pack)
    db.commit()
    return {"message": "Pack deleted"}
