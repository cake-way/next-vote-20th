"use client";

import { useState } from "react";
import styled from "styled-components";
import { Button } from "../login/page";

const SignUp: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    selectedTeam: "",
    selectedPart: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handlePasswordToggle = (field: 'password' | 'confirmPassword') => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "이름" },
    { name: "username", type: "text", placeholder: "아이디" },
    { name: "password", type: passwordVisibility.password ? "text" : "password", placeholder: "비밀번호", isPassword: true },
    { name: "confirmPassword", type: passwordVisibility.confirmPassword ? "text" : "password", placeholder: "비밀번호 확인", isPassword: true },
    { name: "email", type: "email", placeholder: "이메일 주소" },
  ];

  const selectOptions: { [key: string]: string[] } = {
    team: ["팀명 선택", "팀 A", "팀 B", "팀 C"],
    part: ["파트 선택", "FE", "BE", "QA"],
  };

  return (
    <LoginLayout>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <InputWrapper key={field.name}>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {field.isPassword && (
              <PasswordContainer>
                <ToggleButton onClick={() => handlePasswordToggle(field.name as 'password' | 'confirmPassword')}>
                  {passwordVisibility[field.name as 'password' | 'confirmPassword'] ? "숨기기" : "보기"}
                </ToggleButton>
              </PasswordContainer>
            )}
          </InputWrapper>
        ))}

        {Object.keys(selectOptions).map((key) => (
          <Select
            key={key}
            name={key === "team" ? "selectedTeam" : "selectedPart"}
            value={formData[key === "team" ? "selectedTeam" : "selectedPart"]}
            onChange={handleChange}
          >
            {selectOptions[key].map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </Select>
        ))}

        <Button type="submit">회원가입</Button>
      </FormContainer>
    </LoginLayout>
  );
};

export default SignUp;

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
  color: rgb(0, 0, 0);
`;

const FormContainer = styled.form`
  padding: 70px 48px 20px 48px;
  border-radius: 20px;
  border: 3px solid rgb(255, 108, 129);
  text-align: center;
  width: 640px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 16px;
  border: none;
  border-bottom: 2px solid rgb(255, 108, 129);
  outline: none;
  font-size: 16px;
`;

const PasswordContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 35px;
`;

const ToggleButton = styled.button`
  background: none;
  width: 50px;
  position: absolute;
  bottom: 0px;
  right: 5px;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    color: rgb(255, 108, 129);
  }
`;

const Select = styled.select`
  width: 45%;
  padding: 15px;
  margin: 5px;
  border: 2px solid rgb(255, 108, 129);
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  outline: none;
`;