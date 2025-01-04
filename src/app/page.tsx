"use client";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // 클라이언트 측에서만 localStorage 접근
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const onClick = (part: string) => {
    if (!token) {
      setIsModalOpen(true);
      setModalMessage("로그인 후 투표가 가능해요!");
      return;
    }
    router.push(`/vote/${part}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  return (
    <>
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

  margin-top: 9.375rem;
  @media (max-height: 50rem) {
    margin-top: 1.875rem;
  }

  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Header = styled.h1`
  margin-bottom: 2rem;

  @media (max-width: 48rem) {
    font-size: 1.6rem;
  }
  @media (max-width: 29.6875rem) {
    font-size: 1.3rem;
  }
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

  @media (max-width: 48rem) {
    padding: 1.5rem;
  }
  @media (max-width: 29.6875rem) {
    padding: 1rem;
  }
`;
