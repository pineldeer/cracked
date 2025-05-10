// src/api/starApi.ts

// 별 목록 불러오기
export async function fetchStarSessions(userId: string) {
    // 실제로는 fetch/axios 등으로 백엔드에서 받아와야 함
    // 예시: return await fetch(`/api/stars?userId=${userId}`).then(res => res.json());
    return [
        { id: '1', x: 0.3, y: 0.4 },
        { id: '2', x: 0.7, y: 0.2 }
    ];
}

// 별 생성
export async function createStarSession(userId: string, x: number, y: number) {
    // 실제로는 POST 요청 필요
    // 예시: return await fetch('/api/stars', { method: 'POST', body: JSON.stringify({userId, x, y}) }).then(res => res.json());
    return { id: String(Date.now()), x, y };
}

// 세션 메시지 불러오기
export async function fetchSessionMessages(userId: string, sessionId: string) {
    // 실제로는 fetch/axios 등으로 백엔드에서 받아와야 함
    // 예시: return await fetch(`/api/sessions/${sessionId}?userId=${userId}`).then(res => res.json());
    return [
        { role: 'user', text: '별아 안녕?' },
        { role: 'ai', text: '안녕하세요! 무엇이 궁금한가요?' }
    ];
}

// 메시지 전송 및 AI 응답 받기
export async function sendMessageToSession(userId: string, sessionId: string, text: string) {
    // 실제로는 POST 요청 필요
    // 예시: return await fetch(`/api/sessions/${sessionId}/message`, { method: 'POST', body: JSON.stringify({userId, text}) }).then(res => res.json());
    return [
        { role: 'ai', text: 'AI의 응답 예시입니다.' }
    ];
}