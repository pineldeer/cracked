import type { rawUserInfo } from "../types/type"

// src/api/api.ts
const BASE_URL = 'https://backend.cracked-tombstone.org'

// src/api/api.ts

export const submitUserInfo = async (
    userId: string,
    data: {
        name: string
        gender: string
        age: number
        photoBinary: Blob
    }
) => {
    // ✅ query string 생성
    const query = new URLSearchParams({
        name: data.name,
        gender: data.gender,
        age: String(data.age),
    })

    // ✅ FormData 생성 (body에 image만 담음)
    const formData = new FormData()
    formData.append('image', data.photoBinary, 'photo.jpg')   // 파일 이름은 아무거나 가능

    // ✅ fetch 호출
    const response = await fetch(`${BASE_URL}/api/users/register/${userId}?${query.toString()}`, {
        method: 'POST',
        body: formData,
        // 절대 Content-Type 설정 금지 → FormData는 자동으로 boundary 포함 설정
    })

    if (!response.ok) throw new Error('유저 정보 전송 실패')
    return response.json()
}

export const getUserInfo = async (userId: string) : Promise<rawUserInfo> => {
  const response = await fetch(`${BASE_URL}/api/users/user_info/${userId}`)
  if (!response.ok) throw new Error('유저 정보 불러오기 실패')
  return response.json()
}

export const getPortraitImage = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/users/image/${userId}`, {
    method: "GET",
    headers: {
        // "ngrok-skip-browser-warning": "true",
  }})
  if (!response.ok) throw new Error('영정사진 불러오기 실패')
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}








export const submitGraveContent = async (userId: string, text: string) => {
  const response = await fetch(`${BASE_URL}/api/grave/save_grave_content/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "content": text }),
  })
  if (!response.ok) throw new Error('묘비문 전송 실패')
  return response.json()
}

export const getGraveContent = async (userId: string) : Promise<string> => {
  const response = await fetch(`${BASE_URL}/api/grave/get_grave_content/${userId}`)
  if (!response.ok) throw new Error('묘비문 불러오기 실패')
  return response.json()
}








export const getChat = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/api/chat/create_question/${userId}`)
  if (!response.ok) throw new Error('채팅 불러오기 실패')
  return response.json()
}

export const createQuestion = async (userid: string) => {
    const response = await fetch(`${BASE_URL}/api/chat/create_question/${userid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('질문 생성 실패')
    return response.json()
}

export const answerQeuestion = async (userId: string, order_idx: string, answer: string) => {
    const query = new URLSearchParams({
        order_idx,
        answer,
    })
    const response = await fetch(`${BASE_URL}/api/chat/answer_question/${userId}${query.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('질문 답변 실패')
    return response.json()
}