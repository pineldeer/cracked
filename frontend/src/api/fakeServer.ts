// 가짜 서버 API
export async function getPortraitImage(userPhotoUrl: string) {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            // 테스트용 가짜 이미지 URL
            resolve(`https://via.placeholder.com/300x300?text=Portrait&url=${encodeURIComponent(userPhotoUrl)}`)
        }, 1000) // 1초 delay 가정
    })
}