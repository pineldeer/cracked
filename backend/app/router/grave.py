from fastapi import APIRouter, HTTPException, UploadFile, File


router = APIRouter()

# 묘비명 등록
@router.post("/save_grave_content/{user_id}")
def save_grave_content(user_id: str, grave_content: str):
    # DB에 user_id 가지고 DB user 테이블에 묘비명 등록
    return {"message": "Grave content saved successfully"}

# 묘비명 조회
@router.get("/get_grave_content/{user_id}")
def get_grave_content(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 묘비명 조회
    return {"message": "Grave content retrieved successfully"}

