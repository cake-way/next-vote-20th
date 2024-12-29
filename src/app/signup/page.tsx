"use client";

import { useState } from "react";
import styled from "styled-components";
import { Button, FormContainer, Layout, Title } from "../login/page";

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

  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string) => { // 유효성 검사
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    const containsKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (!password) {
      return ""; // 비어 있을 경우 에러 메시지 지움
    }

    if (containsKorean.test(password)) {
      return "비밀번호에 한글을 포함할 수 없습니다.";
    }

    if (password.length < 8 || password.length > 12) {
      return "비밀번호는 8~12자리여야 합니다.";
    }

    if (!/[A-Z]/.test(password)) {
      return "비밀번호에 최소 1개의 대문자가 포함되어야 합니다.";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "비밀번호에 최소 1개의 특수문자가 포함되어야 합니다.";
    }

    if (!regex.test(password)) {
      return "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrorMessages((prev) => ({
        ...prev,
        password: passwordError,
      }));
    }

    if (name === "confirmPassword") {
      const confirmError =
        value !== formData.password
          ? "비밀번호가 일치하지 않습니다."
          : "";
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    // 비밀번호 유효성 검사
    const passwordError = validatePassword(password);

    if (passwordError) {
      alert(passwordError); // 유효성 오류 발생 시 경고
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 성공:", formData);
  };

  const handlePasswordToggle = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "이름" },
    { name: "username", type: "text", placeholder: "아이디" },
    {
      name: "password",
      type: passwordVisibility.password ? "text" : "password",
      placeholder: "비밀번호",
      isPassword: true,
    },
    {
      name: "confirmPassword",
      type: passwordVisibility.confirmPassword ? "text" : "password",
      placeholder: "비밀번호 확인",
      isPassword: true,
    },
    { name: "email", type: "email", placeholder: "이메일 주소" },
  ];

  const selectOptions: { [key: string]: string[] } = {
    team: ["팀명 선택", "CakeWay", "페달지니", "PhotoGround", "커피딜", "엔젤브릿지"],
    part: ["파트 선택", "FE", "BE", "PM", "DESIGN"],
  };

  return (
    <Layout>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSubmit}>
        {inputFields.map((field) => (
          <InputWrapper key={field.name}>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
            {field.isPassword && (
              <PasswordContainer>
                <ToggleButton
                  onClick={() =>
                    handlePasswordToggle(field.name as "password" | "confirmPassword")
                  }
                >
                  {passwordVisibility[field.name as "password" | "confirmPassword"]
                    ? "숨기기"
                    : "보기"}
                </ToggleButton>
              </PasswordContainer>
            )}
            {field.name === "password" && errorMessages.password && (
              <ErrorText>{errorMessages.password}</ErrorText>
            )}
            {field.name === "confirmPassword" && errorMessages.confirmPassword && (
              <ErrorText>{errorMessages.confirmPassword}</ErrorText>
            )}
          </InputWrapper>
        ))}

        {Object.keys(selectOptions).map((key) => (
          <Select
            key={key}
            name={key === "team" ? "selectedTeam" : "selectedPart"}
            value={formData[key === "team" ? "selectedTeam" : "selectedPart"]}
            onChange={handleInputChange}
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
    </Layout>
  );
};

export default SignUp;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.75rem;
  margin-top: -0.3125rem; 
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9375rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 0.125rem solid rgb(255, 108, 129);
  outline: none;
  font-size: 1rem;
`;

const PasswordContainer = styled.div`
  position: absolute;
  right: 0.625rem;
  top: 2.1875rem;
`;

const ToggleButton = styled.button`
  background: none;
  width: 3.125rem;
  position: absolute;
  bottom: 0;
  right: 0.3125rem;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    color: rgb(255, 108, 129);
    transition: 0.2s;
  }
`;

const Select = styled.select`
  width: 45%;
  padding: 0.9375rem;
  margin: 0.3125rem;
  border: 0.125rem solid rgb(255, 108, 129);
  border-radius: 0.3125rem;
  font-size: 1rem;
  background-color: white;
  outline: none;
`;