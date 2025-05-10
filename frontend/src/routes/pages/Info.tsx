// pages/Info.tsx
import styled from 'styled-components'

export default function Info() {
    return (
        <Container>
            <Title>나의 정보 입력</Title>
            <Form>
                <Label>사진</Label>
                <Input type="file" accept="image/*" />

                <Label>이름</Label>
                <Input type="text" placeholder="이름을 입력하세요" />

                <Label>성별</Label>
                <Select>
                    <option>선택하세요</option>
                    <option>남성</option>
                    <option>여성</option>
                    <option>기타</option>
                </Select>

                <Label>나이</Label>
                <Input type="number" placeholder="나이를 입력하세요" />
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