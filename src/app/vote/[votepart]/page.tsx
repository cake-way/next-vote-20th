"use client";
import { useParams, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { VOTE_CONTENT } from "@/app/constants/common";

export default function Page() {
  const params = useParams<{ votepart: "FE" | "BE" | "TEAM" }>();
  const router = useRouter();
  const onClick = (a: string) => {
    router.push(`result/${a}`);
  };
  const backClicked = () => {
    router.back();
  };

  return (
    <Container>
      <Header>
        <BackIcon onClick={backClicked}>◀︎</BackIcon>
        <span>
          {params.votepart}
          {params.votepart === "TEAM" ? "" : "파트장"} 투표
        </span>
      </Header>
      <TextContainer votepart={params.votepart}>
        {VOTE_CONTENT[params.votepart].map((prop) => (
          <Text key={prop.name}>{prop.name}</Text>
        ))}
        <Result>투표하기</Result>
        <Result onClick={() => onClick(params.votepart)}>결과보기</Result>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-top: 1.875rem;
`;
const Header = styled.h1`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 64rem) {
    font-size: 1.8rem;
  }
  @media (max-width: 48rem) {
    font-size: 1.5rem; 
  }
`;

const BackIcon = styled.span`
  color: #ff6c81;
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

  @media (max-width: 64rem) {
    padding: 1.5rem;
  }
  @media (max-width: 48rem) {
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

const TextContainer = styled.div<{ votepart: string }>`
  display: ${({ votepart }) =>
    votepart === "TEAM"
      ? "flex"
      : "grid"}; //{name}/ 함수식으로 해야props가 변경될 때마다 함수가 재실행되어 새로운 값을 계산
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  gap: 1rem;
`;

const Result = styled.button`
  background-color: transparent;
  border: 0.2rem solid #ff6c81;
  padding: 0.3rem;
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }
    
  @media (max-height: 500rem) {
    padding: 0.2rem;
    font-size: 0.8rem;
  }
`;
