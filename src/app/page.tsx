"use client";
import styled from "styled-components";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onClick = (part: string) => {
    router.push(`/vote/${part}`);
  };

  return (
    <Container>
      <Header>파트장/ 데모데이 투표</Header>
      <TextContainer>
        <Text onClick={() => onClick("FE")}>
          FE 파트장 투표
          <br />
          바로가기
        </Text>
        <Text onClick={() => onClick("BE")}>
          BE 파트장 투표
          <br />
          바로가기
        </Text>
        <Text onClick={() => onClick("TEAM")}>
          데모데이 투표
          <br />
          바로가기
        </Text>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Header = styled.h1`
  margin-bottom: 2rem;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Text = styled.p`
  border: 0.3rem solid #ff6c81;
  border-radius: 0.3rem;
  padding: 2rem;
  text-align: center;
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }
`;
