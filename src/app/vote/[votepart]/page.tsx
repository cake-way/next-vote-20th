"use client";
import { useParams, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { VOTE_CONTENT } from "@/app/constants/common";
import { useStore } from "@/stores/useVote";
import { useState } from "react";
import { submitVoteWrapper } from "@/app/lib/api";

export default function Page() {
  const params = useParams<{ votepart: "FE" | "BE" | "TEAM" }>();
  const router = useRouter();
  const [clicked, setClicked] = useState("");
  const { setUserId, setVoteId, setLeaderId, user_id, leader_id, vote_id } =
    useStore();

  const onClick = (a: string) => {
    router.push(`result/${a}`);
  };
  const backClicked = () => {
    router.back();
  };
  const onLeaderClicked = (name: string) => {
    setClicked(name);
  };
  const onVoteCliced = () => {
    console.log("user_id:" + user_id, "leader_id:" + leader_id);
    setUserId("지민재"); //현재 유저로 바꾸기
    setLeaderId(clicked);
    setVoteId(new Date().toLocaleDateString());
    submitVoteWrapper(vote_id, user_id, leader_id);

    router.push(`result/${params.votepart}`);
  };

  //결과화면이랑 중복되는건 컴포넌트로 만들기
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
          <Text
            onClick={() => onLeaderClicked(prop.name)}
            key={prop.name}
            $isActive={clicked === prop.name} //$를 사용해야 p dom요소에 전달이 안됨
          >
            {prop.name}
          </Text>
        ))}
        <Result onClick={onVoteCliced}>투표하기</Result>
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
  height: calc(100vh - 8rem);
  margin-top: 1.875rem;
`;
const Header = styled.h1`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;

  /* @media (min-width: 64rem) {
    font-size: 1.8rem;
  } */
  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
`;

const BackIcon = styled.span`
  color: #ff6c81;
`;

const Text = styled.p<{ $isActive: boolean }>`
  border: 0.3rem solid #ff6c81;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 1rem;
  background-color: ${({ $isActive }) => $isActive && "#ff6c81"};
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }

  @media (min-width: 64rem) {
    padding: 1.2rem;
  }
  @media (max-width: 48rem) {
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
  justify-content: stretch;
  gap: 1rem;
  flex: 1;
  margin-bottom: 1rem;
`;

const Result = styled.button`
  background-color: transparent;
  border: 0.2rem solid #ff6c81;
  padding: 0.3rem;
  color: white;
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }

  @media (max-height: 500rem) {
    padding: 0.2rem;
    font-size: 0.8rem;
  }
`;
