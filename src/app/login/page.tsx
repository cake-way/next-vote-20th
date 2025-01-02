"use client";

//import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { apiRequest } from "../lib/api";

const Login: React.FC = () => {

    const [userId, setUserId] = useState(""); // 아이디 상태
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부

    // 로그인 요청 함수
    const handleLogin = async () => {
        try {
            console.log("로그인 요청 시작"); // 요청 시작 확인
          const response = await apiRequest("auth", "POST", {
            username: userId,
            password: password,
          }, "login");
          console.log("API 응답 구조:", response); // 응답 데이터 전체 확인
      
          // 응답에서 'data'와 'token'을 확인
            if (response.success && response.data.token) {
                console.log("로그인 성공:", response);
                localStorage.setItem("token", response.data.token); // 응답에서 token을 로컬스토리지에 저장
                alert("로그인 성공!");
            } else {
                console.error("로그인 실패: 토큰이 응답에 없습니다.");
                alert("로그인 실패: 토큰이 응답에 없습니다.");
            }
            } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("로그인 실패:", error);
                alert("로그인 실패 ㅋㅋ!");
            } else {
                console.error("예기치 못한 오류:", error);
            }
            }
        };

    return (
        <Layout>
            <Title>로그인</Title>
            <FormContainer>
                <Input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)} // 상태 업데이트
                />
                <PasswordContainer>
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
                    />
                    <ToggleButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? "숨기기" : "보기"}
                    </ToggleButton>
                </PasswordContainer>
                <Button onClick={handleLogin}>로그인</Button> {/* 로그인 버튼 */}
            </FormContainer>
        </Layout>
    );
};

export default Login;

const Layout = styled.div`
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    margin-top: 9.375rem;
    @media (max-height: 48rem) {
        margin-top: 30%;
    }
`;

export const Title = styled.h1`
    margin-bottom: 1.5rem;
    @media (max-width: 64rem) {
        font-size: 1.8rem;
    }
    @media (max-width: 48rem) {
        font-size: 1.5rem; 
    }
`;

export const FormContainer = styled.form`
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

export const Button = styled.button`
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
