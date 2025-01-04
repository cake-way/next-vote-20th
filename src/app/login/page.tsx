"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useAuthStore } from "@/stores/useAuth";
import Modal from "@/components/Modal";

import { apiRequest } from "../lib/api";
import { ApiResponse } from "./dto";

const Login: React.FC = () => {
  const router = useRouter();
  const { username, setUserName, login } = useAuthStore(); // 전역적으로 관리할 상태들

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  }); // 모달 상태 통합

  // 로그인 버튼 클릭 이벤트
  const handleLoginButtonClick = async (e: React.FormEvent) => {
    e.preventDefault(); // 클릭 이벤트 발생 시 기본 동작 방지, 페이지 새로고침 없이 로그인 로직을 수행할 수 있도록

    if (username === "" || password === "") {
      setModalState({
        isOpen: true,
        message:
          username === ""
            ? "아이디를 입력해 주세요."
            : "비밀번호를 입력해 주세요.",
      });
      return;
    }

    const loginRequest = { username, password };

    try {
      const response: ApiResponse = await apiRequest(
        "auth",
        "POST",
        loginRequest,
        "login"
      );

      // 로그인 성공 처리
      localStorage.setItem("token", response.data.token); // 토큰 저장
      login(); // 로그인 상태로 변경
      setIsLoginSuccessful(true); // 로그인 성공 상태로 설정

      // 로그인 성공 모달 표시
      setModalState({ isOpen: true, message: "로그인 성공!" });
    } catch (error) {
      // 로그인 실패 처리
      console.log("로그인 실패: ", error);
      setModalState({
        isOpen: true,
        message: "아이디 또는 비밀번호를 다시 입력해 주세요.",
      });
      setUserName(""); // 입력 필드 초기화
      setPassword(""); // 비밀번호 필드 초기화
    }
  };

  // 비밀번호 숨김 토글 버튼
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));

    // 로그인 성공 시에만 홈으로 이동
    if (isLoginSuccessful) {
      router.push("/"); // 로그인 성공 시 홈으로 이동
    }
  };

  return (
    <Layout>
      <Title>로그인</Title>
      <FormContainer>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ToggleButton type="button" onClick={toggleShowPassword}>
            {showPassword ? "숨기기" : "보기"}
          </ToggleButton>
        </PasswordContainer>
        <Button
          disabled={username === "" && password === ""}
          onClick={handleLoginButtonClick}
        >
          로그인
        </Button>
      </FormContainer>
      <Modal
        isOpen={modalState.isOpen}
        message={modalState.message}
        onClose={handleModalClose}
      />
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -5rem;
  height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  @media (max-width: 64rem) {
    font-size: 1.8rem;
  }
  @media (max-width: 48rem) {
    font-size: 1.5rem;
  }
`;

const FormContainer = styled.form`
  padding: 4.375rem 3rem 1.25rem 3rem;
  border-radius: 1.25rem;
  border: 0.1875rem solid rgb(255, 108, 129);
  text-align: center;
  width: 37.5rem; /* 기본 고정 너비 */
  @media (max-width: 37.5rem) {
    width: 90%; /* 600px 이하에서 화면 크기에 따라 유동적으로 줄어듦 */
    padding: 3.125rem 1.875rem 1rem 1.875rem; /* 여백 유지 */
  }
  @media (max-width: 25rem) {
    width: 80%; /* 400px 이하에서 더 작아짐 */
    padding: 2.5rem 1.25rem 0.75rem 1.25rem; /* 여백도 줄어듦 */
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9375rem;
  margin-bottom: 1rem;
  border: none; /* 모든 보더 제거 */
  border-bottom: 0.125rem solid rgb(255, 108, 129); /* 아래쪽 보더만 추가 */
  outline: none;
  font-size: 1rem;
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.625rem;
  top: 0.9375rem;
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    color: rgb(255, 108, 129);
    transition: 0.2s;
  }
`;

const Button = styled.button`
  width: 30%;
  background-color: #ffffff;
  padding: 0.8rem;
  margin-top: 3rem;
  color: black;
  border: 0.125rem solid rgb(255, 108, 129);
  border-radius: 0.9375rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 108, 129);
    color: #ffffff;
    font-weight: 600;
    transition: 0.2s;
  }
  @media (max-width: 48rem) {
    width: 30%;
    padding: 0.625rem;
  }
  @media (max-width: 29.6875rem) {
    width: 40%;
    padding: 0.4375rem;
    margin-top: 1.875rem;
    font-size: 0.8rem;
  }
`;
