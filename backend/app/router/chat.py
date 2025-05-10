from fastapi import APIRouter, HTTPException, UploadFile, File
from app.config import OPENAI_API_KEY
from openai import OpenAI
from pydantic import BaseModel
from database import create_connection
from typing import List
router = APIRouter()

# response 형식
class Chat(BaseModel):
    id: int
    user_id: str
    question: str
    answer: str
    order_idx: int

# 모든 질문 get
@router.get("/get_all_chat/{user_id}", response_model=List[Chat])
def get_all_chat(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM chat WHERE user_id = ?", (user_id,))
    chats = cursor.fetchall()
    conn.close()
    return [
        {
        "id": chat[0],
        "user_id": chat[1],
        "question": chat[2],
        "answer": chat[3],
        "order_idx": chat[4],
        "created_at": chat[5]
        }
        for chat in chats
    ]

# ai 질문 생성
@router.post("/create_question/{user_id}", response_model=Chat)
def create_question(user_id: str):

    client = OpenAI(api_key=OPENAI_API_KEY)

    messages = [{"role": "system", "content": "You are a helpful assistant that create question for user."}]
    previous_chats = get_all_chat(user_id)
    for chat in previous_chats:
        messages.append({"role": "assistant", "content": chat["question"]})
        messages.append({"role": "user", "content": chat["answer"]})

    response = client.chat.completions.create(
            model="gpt-4o-mini",  # or "gpt-3.5-turbo"
            messages=messages
        )
    
    previous_chats_len = len(previous_chats)
    
    question = response.choices[0].message.content.strip()

    # 질문 저장
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO chat (user_id, question, answer, order_idx) VALUES (?, ?, ?, ?)", (user_id, question, "", previous_chats_len))
    conn.commit()
    # 질문 저장 후 질문 번호 반환
    cursor.execute("SELECT * FROM chat WHERE user_id = ? AND order_idx = ?", (user_id, previous_chats_len))
    chat = cursor.fetchone()
    conn.close()
    return {
        "id": chat[0],
        "user_id": chat[1],
        "question": chat[2],
        "answer": chat[3],
        "order_idx": chat[4],
        "created_at": chat[5]
    }

# response 형식
class AnswerQuestionResponse(BaseModel):
    message: str

# ai 질문 답변
@router.post("/answer_question/{user_id}", response_model=AnswerQuestionResponse)
def answer_question(user_id: str, order_idx: int, answer: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE chat SET answer = ? WHERE user_id = ? AND order_idx = ?", (answer, user_id, order_idx))
    conn.commit()
    conn.close()
    return {"message": "Answer updated successfully"}