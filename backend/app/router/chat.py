from fastapi import APIRouter, HTTPException, UploadFile, File


router = APIRouter()

# ai 질문 생성
@router.post("/create_question/{user_id}")
def create_question(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    return {"message": "User info retrieved successfully"}

# ai 질문 답변
@router.post("/answer_question/{user_id}")
def answer_question(user_id: str, chat_order: int):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    return {"message": "User info retrieved successfully"}

# 모든 질문 get
@router.get("/get_all_chat/{user_id}")
def get_all_chat(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    return {"message": "User info retrieved successfully"}




