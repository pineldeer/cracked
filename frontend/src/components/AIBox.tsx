import styled from "styled-components";
import { useState } from "react";


export default function AIBox() {
    const [epitaph, setEpitaph] = useState("");

    return (
        <Container>
            <EpitaphArea
                value={epitaph}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEpitaph(e.target.value)}
                placeholder="여기에 AI에게 질문하세요..."
            />
        </Container>
    );
}
const Container = styled.div``

const EpitaphArea = styled.textarea`
    flex-grow: 1;
    resize: vertical; // ✅ 입력 길이에 따라 아래로 늘어남
    min-height: 300px;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
`;
