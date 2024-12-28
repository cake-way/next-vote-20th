"use client";

import styled from "styled-components";

const Login: React.FC = () => {
    return(
        <LoginLayout>
            <Title>로그인</Title>
            <FormContainer>
                <Input type="text" placeholder="아이디" />
                <Input type="password" placeholder="비밀번호" />
                <LoginButton>로그인</LoginButton>
            </FormContainer>
        </LoginLayout>
    )
}

export default Login;

const LoginLayout = styled.div`
    background-color: #384084;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
`;
const Title = styled.h1`
    margin-bottom: 24px;
    color: #FFFFFF;
`;
const FormContainer = styled.div`
    background-color: #ffffff;
    padding: 70px 48px 20px 48px;
    border-radius: 20px;
    text-align: center;
    width: 640px;
`;
const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 16px;
    border: 2px solid #242957;
    border-radius: 20px;
    font-size: 16px;
`;

const LoginButton = styled.button`
    width: 30%;
    padding: 12.8px;
    margin-top: 48px;
    background-color: #384084;
    color: #ffffff;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #2c316a;
    }
`;