from fastapi import APIRouter, HTTPException, UploadFile, File


router = APIRouter()


@router.post("/register/{user_id}")
def register_user(user_id: str, name: str, image: UploadFile = File(...)):
    # 유저 등록
    # DB에 user_id 가지고 DB user 테이블에 유저 등록
    return {"message": "User registered successfully"}

# get user info
@router.get("/user_info/{user_id}")
def get_user_info(user_id: str):
    # DB에 user_id 가지고 DB user 테이블에 유저 정보 조회
    return {"message": "User info retrieved successfully"}

