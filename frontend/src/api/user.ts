

// export const submitUserInfo = async (
//     userId: string,
//     data: {
//         name: string
//         gender: string
//         age: number
//         photoBinary: Blob
//     }
// ) => {
//     // ✅ query string 생성
//     const query = new URLSearchParams({
//         name: data.name,
//         gender: data.gender,
//         age: String(data.age),
//     })

//     // ✅ FormData 생성 (body에 image만 담음)
//     const formData = new FormData()
//     formData.append('image', data.photoBinary, 'photo.jpg')   // 파일 이름은 아무거나 가능

//     // ✅ fetch 호출
//     const response = await fetch(`${process.env.BASE_URL}/api/users/register/${userId}?${query.toString()}`, {
//         method: 'POST',
//         body: formData,
//         // 절대 Content-Type 설정 금지 → FormData는 자동으로 boundary 포함 설정
//     })

//     if (!response.ok) throw new Error('유저 정보 전송 실패')
//     return response.json()
// }

// export const getUserInfo = async (userId: string) : Promise<rawUserInfo> => {
//   const response = await fetch(`${BASE_URL}/api/users/user_info/${userId}`)
//   if (!response.ok) throw new Error('유저 정보 불러오기 실패')
//   return response.json()
// }

// export const getPortraitImage = async (userId: string) => {
//   const response = await fetch(`${BASE_URL}/api/users/image/${userId}`, {
//     method: "GET",
//     headers: {
//         // "ngrok-skip-browser-warning": "true",
//   }})
//   if (!response.ok) throw new Error('영정사진 불러오기 실패')
//   const blob = await response.blob()
//   return URL.createObjectURL(blob)
// }
