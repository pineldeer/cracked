// src/pages/Main.tsx
import styled, { keyframes } from 'styled-components'
import useUser from '../../hooks/useUser'
import { useEffect, useState } from 'react'
import { getPortraitImage, submitUserInfo, getUserInfo } from '../../api/api'
import { getUserIdImediately } from '../../contexts/UserIdContext'
import { useNavigate } from 'react-router-dom'
// import { userInfo } from '../../\btypes/type'

export default function Main() {
    const { user, setUser } = useUser()
    // const userId = useUserId()

    const navigate = useNavigate()
    
    const [isModalOpen, setIsModalOpen] = useState(false) // ✅ modal 상태
    const [epitaph, setEpitaph] = useState('')            // ✅ 묘비문 상태

    useEffect(() => {
        async function fetchUserInfo() {
            console.log("fetch called!")
            const id = getUserIdImediately()

            if (id) {
                const res = await getUserInfo(id)
                if (res) {
                    setUser({
                        name: res.username,
                        photoUrl: res.image_path,
                        photoFile: undefined,
                        gender: res.gender,
                        age: res.age,
                        portraitUrl: await getPortraitImage(id),
                    })
                } 
                else if (!user.name || !user.age || !user.gender || !user.photoFile) navigate('/')
                else {
                    const res = await submitUserInfo(id, {name: user.name, gender: user.gender, age: user.age, photoBinary: user.photoFile})
                    if (res) {
                        const portraitUrl = await getPortraitImage(id)
                        // setUser((prev: userInfo) => ({...prev, portraitUrl: await getPortraitImage(userId)} as userInfo))  
                        console.log(portraitUrl)
                    }
                }
            } else {
                console.error('userId가 없습니다.')
                return
            }

        }

        fetchUserInfo()
    }, [])

    const now = new Date().toLocaleString()

    return (
        <Container>
            <>
                <Portrait src={user.portraitUrl ?? undefined} alt="영정사진" />
                <MessageSection>
                    <MainMessage>{user.name}은 {now}에 죽었습니다.</MainMessage>
                    <SubMessage>묘비문을 작성해 보세요. 아래 묘비를 클릭하세요 ↓</SubMessage>
                </MessageSection>
                <Spacer />
                <GraveIcon onClick={() => setIsModalOpen(true)}>
                    🪦
                </GraveIcon>

                {isModalOpen && (
                    <ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <ModalSheet onClick={(e: React.ChangeEvent<HTMLDivElement>) => e.stopPropagation()}> {/* ✅ 모달 클릭 시 이벤트 버블링 방지 */}
                            <ModalTitle>나의 묘비문을 작성하세요</ModalTitle>
                            <EpitaphInput
                                value={epitaph}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEpitaph(e.target.value)}
                                placeholder="나의 묘비문을 여기에 작성하세요..."
                            />
                        </ModalSheet>
                    </ModalOverlay>
                )}                
            </>
        </Container>
    )
}

// styled-components (추가 + 기존 그대로 유지)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200vh;
    background-color: #f0f0f0;
`

// const Loading = styled.div`
//     margin-top: 40vh;
//     font-size: 1.5rem;
// `

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

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-end;          // ✅ 아래서 시작
`

const ModalSheet = styled.div`
    background: white;
    width: 100%;
    max-height: 80%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 -4px 15px rgba(0,0,0,0.2);
    animation: ${slideUp} 0.3s ease-out;
    display: flex;
    flex-direction: column;
`

const ModalTitle = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    text-align: center;
`

const EpitaphInput = styled.textarea`
    width: 100%;
    min-height: 200px;
    resize: vertical;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
`