from fastapi import APIRouter, HTTPException, UploadFile, File
from database import create_connection

router = APIRouter()

# 묘비명 등록
@router.post("/save_grave_content/{user_id}")
def save_grave_content(user_id: str, grave_content: str):
    conn = create_connection()
    cursor = conn.cursor()
    # DB에 user_id 가지고 DB user 테이블에 묘비명 등록
    cursor.execute('''
        INSERT INTO grave (user_id, content)
        VALUES (?, ?)
    ''', (user_id, grave_content))
    conn.commit()
    conn.close()
    # DB에 user_id 가지고 DB user 테이블에 묘비명 등록
    return {"message": "Grave content saved successfully"}

# 묘비명 조회
@router.get("/get_grave_content/{user_id}")
def get_grave_content(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 묘비명 조회
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT content FROM grave WHERE user_id = ?
    ''', (user_id,))
    grave_content = cursor.fetchone()
    conn.close()
    if grave_content is None:
        raise HTTPException(status_code=404, detail="Grave content not found")
    return {"grave_content": grave_content[0]}

