"use client";

import { useState } from "react";
import styled from "styled-components";

const Login: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부
    return(
        <LoginLayout>
            <Title>로그인</Title>
            <FormContainer>
                <Input type="text" placeholder="아이디" />
                <PasswordContainer>
                    <Input
                        type={showPassword ? "text" : "password"} // 조건에 따라 type 변경
                        placeholder="비밀번호"
                    />
                    <ToggleButton
                        onClick={() => setShowPassword(!showPassword)} // 클릭 시 상태 변경
                    >
                        {showPassword ? "숨기기" : "보기"} {/* 버튼 텍스트 변경 */}
                    </ToggleButton>
                </PasswordContainer>
                <Button>로그인</Button>
            </FormContainer>
        </LoginLayout>
    )
}

export default Login;

const LoginLayout = styled.div`
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
`;
const Title = styled.h1`
    margin-bottom: 24px;
    color:rgb(0, 0, 0);
`;
const FormContainer = styled.div`
    padding: 70px 48px 20px 48px;
    border-radius: 20px;
    border: 3px solid rgb(255, 108, 129);
    text-align: center;
    width: 640px;
`;
const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 16px;
    border: none; /* 모든 보더 제거 */
    border-bottom: 2px solid rgb(255, 108, 129); /* 아래쪽 보더만 추가 */
    outline: none;
    font-size: 16px;
`;
const PasswordContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const ToggleButton = styled.button`
    position: absolute;
    right: 10px;
    top: 15px;
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        color:rgb(255, 108, 129);
    }
`;


export const Button = styled.button`
    width: 30%;
    background-color: #ffffff;
    padding: 12.8px;
    margin-top: 48px;
    color: black;
    border: 2px solid rgb(255, 108, 129);
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color:rgb(255, 108, 129);
        color: #ffffff;
        font-weight: 600;
    }
`;