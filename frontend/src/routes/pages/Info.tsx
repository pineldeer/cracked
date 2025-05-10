// src/pages/Info.tsx
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'

export default function Info() {
    const { user, setUser } = useUser()

    const navigate = useNavigate()

    const [photo, setPhoto] = useState<File | null>(null)
    const [name, setName] = useState(user.name ?? '')
    const [gender, setGender] = useState(user.gender ?? '')
    const [age, setAge] = useState(user.age ? String(user.age) : '')

    const isFormComplete = photo && name && gender && age

    useEffect(() => {
        console.log("현재 입력 값:", { photo, name, gender, age })
    }, [photo, name, gender, age])

    const handleNext = () => {
        if (!photo) return

        setUser({
            ...user,
            name,
            gender,
            age: Number(age),
            photoFile: photo,                                     // ✅ 서버 업로드용 File
            photoUrl: URL.createObjectURL(photo),                 // ✅ 화면 미리보기용 URL
        })

        // try {
        //     await submitUserInfo(userId as string, {
        //         name: user.name,
        //         gender: user.gender ?? '',
        //         age: user.age ?? 0,
        //         photoBinary: user.photoFile as File,   // ✅ File or Blob 전달
        //     })
    
        // } catch (error) {
        //     console.error('Main API 호출 실패:', error)
        // }
        
        navigate('/main')
    }

    return (
        <Container>
            <Title>나의 정보 입력</Title>
            <Form>
                <Label>사진</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoto(e.target.files?.[0] ?? null)
                    }
                />

                <Label>이름</Label>
                <Input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />

                <Label>성별</Label>
                <Select
                    value={gender}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGender(e.target.value)
                    }
                >
                    <option value="">선택하세요</option>
                    <option>남성</option>
                    <option>여성</option>
                    <option>기타</option>
                </Select>

                <Label>나이</Label>
                <Input
                    type="number"
                    placeholder="나이를 입력하세요"
                    value={age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAge(e.target.value)
                    }
                />

                {isFormComplete && (
                    <NextButton onClick={handleNext}>다음으로</NextButton>
                )}
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: 100vh;
    background-color: #fafafa;
`

const Title = styled.h2`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 2rem;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
`

const Label = styled.label`
    font-size: 1rem;
    color: #555;
`

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const NextButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
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