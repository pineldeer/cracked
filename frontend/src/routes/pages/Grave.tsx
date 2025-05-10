// src/pages/Grave.tsx
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getUserIdImediately } from '../../contexts/UserIdContext'
import { getGraveContent } from '../../api/api'

export default function Grave() {
    const [epitaph, setEpitaph] = useState('')

    useEffect(() => {
        const id = getUserIdImediately()
        if (!id) return


        async function fetch() {
            const res = await getGraveContent(id as string)
            if (res) {
                setEpitaph(res)
            } else {
                console.log("묘비문을 가져오는 데 실패했습니다.")
            }
        }

        fetch()
    }, [])

    return (
        <Container>
            {/* 왼쪽: 묘비문 작성 영역 */}
            <LeftPane>
                <Title>나의 묘비문을 작성하세요</Title>
                <EpitaphArea
                    value={epitaph}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEpitaph(e.target.value)}
                    placeholder="여기에 나의 묘비문을 작성하세요..."
                />
            </LeftPane>

            {/* 오른쪽: AI 도움 영역 (현재는 공백 + 스크롤 영역) */}
            <RightPane>
                <AiTitle>AI 도움 영역 (준비 중)</AiTitle>
                <AiContent>
                    {/* 향후 AI 질문, 답변 box가 여기에 들어올 예정 */}
                </AiContent>
            </RightPane>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
`

const LeftPane = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
    padding: 2rem;
`

const Title = styled.h2`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
`

const EpitaphArea = styled.textarea`
    flex-grow: 1;
    resize: vertical;               // ✅ 입력 길이에 따라 아래로 늘어남
    min-height: 300px;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
`

const RightPane = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ddd;
    background-color: #ffffff;
    overflow-y: auto;              // ✅ 스크롤 가능
`

const AiTitle = styled.h2`
    font-size: 1.8rem;
    color: #333;
    padding: 2rem 2rem 1rem;
`

const AiContent = styled.div`
    flex-grow: 1;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`