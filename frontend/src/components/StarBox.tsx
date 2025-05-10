import { useEffect, useState } from "react"
import styled from "styled-components"
import { getAllSessions } from "../api/api"
import { getUserIdImediately } from "../contexts/UserIdContext"

type Chat = {
    id: string
    question: string
    answer: string
}

export default function StarBox() {

    const [sessions, setSessions] = useState<number[]>([])
    const [chats, setChats] = useState<Chat[]>([])

    useEffect(() => {
        const id = getUserIdImediately()
        if (!id) return
        
        async function fetchSessions() {
            const res = await getAllSessions(id as string)
            setSessions(res.map((s) => s.id))
        }

        fetchSessions()

    }, [])


    useEffect(() => {
        // if (sessions.length > 0) {

        // }
    }, [sessions])

    return (
        <Container>
            <Header>솔직한 이야기에 도움이 될 만한 질문을 던져요</Header>
            <SessionContainer>

            </SessionContainer>
            <CreateButtion>질문 생성</CreateButtion>
        </Container>
    ) 
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`
const Header = styled.h2`
    font-size: 1.5rem;
    color: white;
`

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-in-out;
`

const CreateButtion = styled.button`
    padding: 0.75rem 1.5rem;
`

const StarIcon = styled.div``