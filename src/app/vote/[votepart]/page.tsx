"use client";
import { useParams, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { useStore } from "@/stores/useVote";
import { useState } from "react";
import { fetchGetLeader, fetchPostVote } from "@/app/lib/api";
import { getPartUrlName } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuth";
import { VOTE_CONTENT } from "@/app/constants/common";
import Modal from "@/components/Modal";
import Loading from "@/components/vote/Loading";

interface ILeader {
  id: number;
  name?: string;
  team?: string;
}

type VoteQueryKey = ["leader", string, string];

export default function Page() {
  const params = useParams<{ votepart: "FE" | "BE" | "TEAM" }>();
  const router = useRouter();
  const [clicked, setClicked] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { setMember, setVoteId, setCandidate, candidate } = useStore();
  const { username } = useAuthStore();
  const { data: leaderData, isLoading: isLoading } = useQuery<
    ILeader[],
    Error,
    ILeader[],
    VoteQueryKey
  >({
    queryKey: ["leader", params.votepart, "leader"],
    queryFn: async () => {
      const response = await fetchGetLeader(
        getPartUrlName(params.votepart, "leader")
      );
      return response.data;
    },
    // 아래 옵션들 추가
    refetchOnWindowFocus: true, // 윈도우가 포커스를 받을 때 리페치
    refetchInterval: 5000, // 5초마다 자동으로 리페치
    staleTime: 0, // 데이터를 항상 stale로 간주

    enabled: true,
  }); //데이터 캐싱을 위해 tanstack query사용
  const demoday = params.votepart === "TEAM";
  console.log(demoday);

  const onResultClick = (a: string) => {
    router.push(`result/${a}`);
  };
  const backClicked = () => {
    router.back();
  };
  const onLeaderClicked = (name: string) => {
    setClicked(name);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onVoteCliced = async () => {
    if (!clicked) {
      setIsModalOpen(true);
      setModalMessage("후보자를 선택해주세요!");
      return;
    }
    if (localStorage.getItem(`${params.votepart}`)) {
      setIsModalOpen(true);
      setModalMessage("이미 투표를 하셨습니다!");
      return;
    }
    try {
      setMember(username); // 현재 유저로 바꾸기
      setCandidate(clicked);
      const newVoteId = new Date().getTime();
      setVoteId(newVoteId);

      console.log(
        "vote_id :" + newVoteId,
        "member :" + username,
        "leader:" + clicked
      );

      const endpoint = String(
        VOTE_CONTENT[params.votepart][
          clicked as keyof (typeof VOTE_CONTENT)[typeof params.votepart]
        ]
      );

      await fetchPostVote(endpoint, demoday);

      localStorage.setItem(`${params.votepart}`, username);

      router.push(`result/${params.votepart}`);
    } catch (error) {
      console.error("투표 제출 실패:", error);
      // 에러 처리 필요
    }
  };

  //결과화면이랑 중복되는건 컴포넌트로 만들기
  return (
    <>
      <Container>
        <Header>
          <BackIcon onClick={backClicked}>◀︎</BackIcon>
          <span>
            {params.votepart}
            {params.votepart === "TEAM" ? "" : "파트장"} 투표
          </span>
        </Header>
        {isLoading ? (
          <Loading /> // 로딩 컴포넌트 사용
        ) : (
          <TextContainer $votepart={params.votepart}>
            {/* {VOTE_CONTENT[params.votepart] */}
            {leaderData?.map((prop: ILeader) => (
              <Text
                onClick={() => onLeaderClicked(prop.name || prop.team || "")} //
                key={prop.id}
                $isActive={clicked === (prop.name || prop.team)} //$를 사용해야 p dom요소에 전달이 안됨
              >
                {demoday ? prop.team : prop.name}
              </Text>
            ))}
            <Result onClick={onVoteCliced}>투표하기</Result>
            <Result onClick={() => onResultClick(params.votepart)}>
              결과보기
            </Result>
          </TextContainer>
        )}
      </Container>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
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
  padding: 1.4rem;
  background-color: ${({ $isActive }) => $isActive && "#ff6c81"};
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
  }

  @media (max-width: 64rem) {
    padding: 1.2rem;
  }
  @media (max-width: 48rem) {
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
  justify-content: stretch;
  gap: 1rem;
  flex: 1;
  margin-bottom: 1rem;
`;

const Result = styled.button`
  background-color: transparent;
  border: 0.2rem solid #ff6c81;
  padding: 0.3rem;
  &:hover {
    background-color: #ff6c81;
    transition: 0.2s;
    color: white;
  }

  @media (max-height: 500rem) {
    padding: 0.2rem;
    font-size: 0.8rem;
  }
`;
