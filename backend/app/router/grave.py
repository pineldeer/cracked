from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from models import Grave
from pydantic import BaseModel

router = APIRouter()

class GraveContent(BaseModel):
    content: str

# 묘비명 등록
@router.post("/save_grave_content/{user_id}")
def save_grave_content(user_id: str, grave_content: GraveContent, db: Session = Depends(get_db)):
    new_grave = Grave(
        user_id=user_id,
        content=grave_content.content
    )
    db.add(new_grave)
    db.commit()
    db.refresh(new_grave)
    return {"message": "Grave content saved successfully"}

# 묘비명 조회
@router.get("/get_grave_content/{user_id}")
def get_grave_content(user_id: str, db: Session = Depends(get_db)):
    grave = db.query(Grave).filter(Grave.user_id == user_id).first()
    if grave is None:
        raise HTTPException(status_code=404, detail="Grave content not found")
    return {"grave_content": grave.content}
