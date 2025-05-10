from fastapi import APIRouter, HTTPException, UploadFile, File
from app.config import OPENAI_API_KEY
from openai import OpenAI
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi import Depends
from database import get_db
from typing import List
from models import Chat as ChatModel
router = APIRouter()

# response 형식
class Chat(BaseModel):
    id: int
    user_id: str
    question: str
    answer: str
    order_idx: int

def Chat_to_dict(chat: ChatModel):
    return {
        "id": chat.id,
        "user_id": chat.user_id,
        "question": chat.question,
        "answer": chat.answer,
        "order_idx": chat.order_idx,
        "created_at": chat.created_at
    }

# 모든 질문 get
@router.get("/get_all_chat/{user_id}", response_model=List[Chat])
def get_all_chat(user_id: str, db: Session = Depends(get_db)):
    chats = db.query(ChatModel).filter(ChatModel.user_id == user_id).all()
    return [Chat_to_dict(chat) for chat in chats]


# ai 질문 생성
@router.post("/create_question/{user_id}", response_model=Chat)
def create_question(user_id: str, db: Session = Depends(get_db)):
    client = OpenAI(api_key=OPENAI_API_KEY)

    messages = [{"role": "system", "content": "You are a helpful assistant that create question for user."}]
    previous_chats = get_all_chat(user_id, db)
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
    new_chat = ChatModel(
        user_id=user_id,
        question=question,
        answer="",
        order_idx=previous_chats_len
    )
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return Chat_to_dict(new_chat)

# response 형식
class AnswerQuestionResponse(BaseModel):
    message: str

# ai 질문 답변
@router.post("/answer_question/{user_id}", response_model=AnswerQuestionResponse)
def answer_question(user_id: str, order_idx: int, answer: str, db: Session = Depends(get_db)):
    chat = db.query(ChatModel).filter(
        ChatModel.user_id == user_id,
        ChatModel.order_idx == order_idx
    ).first()
    
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
        
    chat.answer = answer
    db.commit()
    
    return {"message": "Answer updated successfully"}