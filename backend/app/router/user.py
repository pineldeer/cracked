from fastapi import APIRouter, HTTPException, UploadFile, File, Depends

import os

from fastapi.responses import FileResponse
from database import create_connection

from app.config import UPLOAD_FOLDER

router = APIRouter()

def save_image(image: UploadFile, user_id: str):
    # 이미지 저장 경로 생성
    image_path = os.path.join(UPLOAD_FOLDER, user_id+image.filename)
    # 이미지 저장
    with open(image_path, "wb") as f:
        f.write(image.file.read())
    return image_path

@router.post("/register/{user_id}")
def register_user(user_id: str, name: str, image: UploadFile = File(...)):
    # 유저 등록
    # DB에 user_id 가지고 DB user 테이블에 유저 등록
    # 이미지 저장 및 경로 반환

    # 이미지 저장 go
    image_path = save_image(image, user_id)


    # sqlite3 연결
    conn = create_connection()
    cursor = conn.cursor()
    # user 테이블에 유저 등록
    cursor.execute("INSERT INTO users (id, username, image_path) VALUES (?, ?, ?)", (user_id, name, image_path))
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

# get user info
@router.get("/user_info/{user_id}")
def get_user_info(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    return user[0]

# 이미지 다운로드
@router.get("/image/{user_id}")
def download_image(user_id: str):
    # 이미지 다운로드
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT image_path FROM users WHERE id = ?", (user_id,))
    image_path = cursor.fetchone()
    conn.close()
    return FileResponse(image_path[0])

