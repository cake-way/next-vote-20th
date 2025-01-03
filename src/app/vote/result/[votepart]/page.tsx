"use client";
import { useParams, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchVoteResults } from "@/app/lib/api";
import { getPartUrlName } from "@/utils/utils";

interface IVoteResult {
  voteCount: number;
  candidateName: string;
}
type VoteQueryKey = ["results", string];

export default function Page() {
  const { votepart } = useParams<{ votepart: "FE" | "BE" | "TEAM" }>();
  const { data, isLoading } = useQuery<
    IVoteResult[],
    Error,
    IVoteResult[],
    VoteQueryKey
  >({
    queryKey: ["results", votepart],
    queryFn: async () => fetchVoteResults(getPartUrlName(votepart)),
  }); //객체 형식을 권장

  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <Container>
      <Header>
        {votepart}
        {votepart === "TEAM" ? "" : "파트장"} 투표 결과
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <LoadingText>로딩중...</LoadingText>
        </LoadingContainer>
      ) : (
        <TextContainer $votepart={votepart}>
          {data
            ?.toSorted((a, b) => (a.voteCount > b.voteCount ? -1 : 1))
            .map((prop) => (
              <Text key={prop.candidateName}>
                {prop.candidateName}
                {prop.voteCount}
              </Text>
            ))}
          <Result onClick={onClick}>돌아가기</Result>
        </TextContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Header = styled.h1`
  margin-bottom: 2rem;

  @media (max-width: 64rem) {
    font-size: 1.8rem;
  }
  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
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

const TextContainer = styled.div<{ $votepart: string }>`
  display: ${({ $votepart }) =>
    $votepart === "TEAM"
      ? "flex"
      : "grid"}; //{name}/ 함수식으로 해야props가 변경될 때마다 함수가 재실행되어 새로운 값을 계산
  grid-template-columns: repeat(2, 1fr);
  flex-direction: column;
  gap: 1rem;
`;

const Result = styled.button`
  grid-column: 1/3;
  background-color: transparent;
  border: 0.2rem solid #ff6c81;
  padding: 0.3rem;
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }
`;

//로딩
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.h1`
  color: #ff6c81;
  font-size: 2rem;
`;
