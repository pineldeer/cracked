// pages/Home.tsx
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserInfo } from '../../api/api'
import { useUserId } from '../../contexts/UserIdContext'

export default function Home() {
    const userId = useUserId()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserInfo() {
            if (userId) {
                const res = await getUserInfo(userId)
                if (res) {
                    navigate('/main')
                }                
            }
        }

        fetchUserInfo()
    }, [userId])

    return (
        <Container>
            <Header>당신의 묘비에 무엇을 새기시겠습니까?</Header>
            <StartButton onClick={() => navigate('/info')}>시작하기</StartButton>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(248, 248, 248, 0);
`

const Header = styled.h1`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
`

const StartButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #357ab8;
    }
`