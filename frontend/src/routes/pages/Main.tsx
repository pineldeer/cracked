import styled from 'styled-components'
import useUser from '../../hooks/useUser'
import { useEffect, useState } from 'react'
import { getPortraitImage } from '../../api/fakeServer'
import { useNavigate } from 'react-router-dom'

export default function Main() {
    const { user, setUser } = useUser()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // 서버에서 영정사진 받기
        async function fetchPortrait() {
            const portraitUrl = await getPortraitImage(user.photoUrl ?? '')
            setUser({ ...user, portraitUrl })
            setLoading(false)
        }
        fetchPortrait()
    }, [])

    const now = new Date().toLocaleString()

    return (
        <Container>
            {loading ? (
                <Loading>서버로부터 영정사진을 받는 중...</Loading>
            ) : (
                <>
                    <Portrait src={user.portraitUrl} alt="영정사진" />
                    <MessageSection>
                        <MainMessage>{user.name}은 {now}에 죽었습니다.</MainMessage>
                        <SubMessage>묘비문을 작성해 보세요. 스크롤을 내려주세요 ↓</SubMessage>
                    </MessageSection>
                    <Spacer />
                    <GraveIcon onClick={() => navigate('/epitaph')}>
                        🪦 {/* emoji로 임시 아이콘 */}
                    </GraveIcon>
                </>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200vh; /* 스크롤 가능하게 */
    background-color: #f0f0f0;
`

const Loading = styled.div`
    margin-top: 40vh;
    font-size: 1.5rem;
`

const Portrait = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border: 8px solid black;
    border-radius: 10px;
    margin-top: 5rem;
`

const MessageSection = styled.div`
    margin-top: 2rem;
    text-align: center;
`

const MainMessage = styled.h2`
    font-size: 1.5rem;
    color: #333;
`

const SubMessage = styled.p`
    margin-top: 1rem;
    font-size: 1rem;
    color: #666;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const GraveIcon = styled.div`
    font-size: 4rem;
    cursor: pointer;
    margin-bottom: 3rem;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.2);
    }
`