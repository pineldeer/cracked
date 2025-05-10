// src/pages/Main.tsx
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import useUser from '../../hooks/useUser'
import { useEffect, useState } from 'react'
import { getGraveContent, getPortraitImage, getUserInfo, submitGraveContent } from '../../api/api'
import { getUserIdImediately } from '../../contexts/UserIdContext'
import { useNavigate } from 'react-router-dom'
// import { userInfo } from '../../\btypes/type'
import StarBox from '../../components/StarBox'
import graveIcon from '../../assets/grave-icon.png'
import graveBack from '../../assets/grave-back.png'
import { FaArrowAltCircleRight } from "react-icons/fa";


const YiSunShinFont = createGlobalStyle`
  @font-face {
    font-family: 'YiSunShinRegular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YiSunShinRegular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

export default function Main() {
    const { user, setUser } = useUser()

    const navigate = useNavigate()
    
    const [isModalOpen, setIsModalOpen] = useState(false) // ✅ modal 상태
    const [epitaph, setEpitaph] = useState('')            // ✅ 묘비문 상태

    // const [isLoading, setIsLoading] = useState(true)       // ✅ 로딩 상태

    useEffect(() => {
        const id = getUserIdImediately()
        if (!id) navigate('/')
        
        async function fetchUserInfo() {
            // setIsLoading(true)
            const res = await getUserInfo(id as string)
            if (!res) navigate('/')
            else {
                const portraitUrl = await getPortraitImage(id as string)
                setUser({
                    name: res.username,
                    photoUrl: res.image_path,
                    photoFile: undefined,
                    gender: res.gender,
                    age: res.age,
                    portraitUrl: portraitUrl,
                })

                // setIsLoading(false)
            }
        }

        fetchUserInfo()        
    }, [])

    const now = new Date().toLocaleString()


    useEffect(() => {
        const id = getUserIdImediately()
        if (!id) return

        async function fetch() {
            if (isModalOpen) {
                const res = await getGraveContent(id as string)
                if (res) {
                    setEpitaph(res.grave_content)
                } else {
                    console.log("묘비문을 가져오는 데 실패했습니다.")
                }
            }
        }

        async function upload() {
            if (!isModalOpen) {
                const res = await submitGraveContent(id as string, epitaph)
                if (res) {
                    console.log("묘비문 업로드 성공")
                } else {
                    console.log("묘비문 업로드 실패")
                }
            }
        }

        fetch()
        upload()
    }, [isModalOpen])

    
    return (
        <Container>
            <YiSunShinFont />
            <>
                <Portrait src={user.portraitUrl ?? undefined} alt="영정사진" />
                <MessageSection>
                    <MainMessage>{user.name}은 {now}에 죽었습니다.</MainMessage>
                    <SubMessage>묘비문을 작성해 보세요. 아래 묘비를 클릭하세요 ↓</SubMessage>
                </MessageSection>
                <Spacer />

                <GraveIconWrapper>
                    <GraveIcon onClick={() => setIsModalOpen(true)}>
                        <img src={graveIcon} alt="묘비 아이콘" style={{ width: 300, height: 300 }} />
                    </GraveIcon>
                    
                    <ArrowButton onClick={() => navigate('/grave')}>
                        <FaArrowAltCircleRight size={50} color="white"/>
                    </ArrowButton>
                </GraveIconWrapper>
                {/* <GraveIcon onClick={() => setIsModalOpen(true)}>
                    <img src={graveIcon} alt="묘비 아이콘" style={{ width: 300, height: 300 }} />
                </GraveIcon> */}

                {/* <FaArrowAltCircleRight color='red'/> */}

                {isModalOpen && (
                    <ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <ModalSheet onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <GraveBackImg src={graveBack} alt="묘비 배경" />
                            <EpitaphInput
                                value={epitaph}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEpitaph(e.target.value)}
                                placeholder="나의 묘비문을 여기에 작성하세요..."
                            />
                        </ModalSheet>
                    </ModalOverlay>
                )}



                {/* <Spacer /> */}
                <StarBox />
                <Spacer />
                
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
    /* background-color: #f0f0f0; */
`

// const Loading = styled.div`
//     margin-top: 40vh;
//     font-size: 1.5rem;
// `

const Portrait = styled.img`
    width: 170px;
    height: 170px;
    object-fit: cover;
    border: 8px solid #000;
    border-radius: 10px;
    margin-top: 5rem;
`

const MessageSection = styled.div`
    margin-top: 2rem;
    text-align: center;
`

const MainMessage = styled.h2`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.5rem;
    /* color: #333; */
`

const SubMessage = styled.p`
    font-family: 'Noto Sans KR', sans-serif;
    margin-top: 1rem;
    font-size: 1rem;
    /* color: #666; */
`

const Spacer = styled.div`
    flex-grow: 1;
`
const GraveIconWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const GraveIcon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ArrowButton = styled.div`
    position: absolute;
    right: -15rem;
    top: 100%;
    transform: translateY(-80%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-50%) scale(1.2);   // ✅ hover 시 확대
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

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
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
    position: relative;
    background: none;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 1/1.2; // 묘비 이미지 비율에 맞게 조정
    margin: 0 auto;
    // box-shadow: 0 -4px 15px rgba(0,0,0,0.2);
    animation: ${slideUp} 0.3s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

// const ModalTitle = styled.h2`
//     font-size: 1.3rem;
//     margin-bottom: 1rem;
//     text-align: center;
// `

const EpitaphInput = styled.textarea`
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 55%; // 묘비 중앙에 오도록 조정 (이미지에 따라 값 조정)
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: rgba(255,255,255,0.0);
    border: none;
    color: rgba(255,255,255,0.7);
    font-family: 'YiSunShinRegular';
    font-style: normal;

    font-size: 1.5rem;
    text-align: center;
    resize: none;
    outline: none;
    // font-family: 'Noto Sans KR', sans-serif;
    // 필요시 box-shadow, padding 등 추가
`

const GraveBackImg = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
    pointer-events: none;
    user-select: none;
`