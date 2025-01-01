"use client";

import Router from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";

import InputField from "@/components/signup/InputField";
import SelectField from "@/components/signup/SelectField";

import { Button, FormContainer, Title } from "../login/page";
import { validatePassword } from "../lib/validate";
import { apiRequest } from "../lib/api";

const SignUp: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({
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
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

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

  const handlePasswordToggle = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword, name, username, email, selectedTeam, selectedPart } = formData;

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

    try {
      // 회원가입 API 요청
      const requestBody = {
        username,
        password,
        email,
        name,
        part: selectedPart.toUpperCase(), // "FRONTEND"처럼 모두 대문자로 변환
        team: selectedTeam.toUpperCase(), // "PHOTOGROUND"처럼 모두 대문자로 변환
      };

      const response = await apiRequest("signup", "POST", requestBody, "signup");

      alert("회원가입이 성공적으로 완료되었습니다!"); // 모달 만들 필요성 있음
      console.log("회원가입 성공:", response);
      Router.push("/login"); 

      // login 페이지에서 token 발급 받기 위함, 이것이 회원가입 시 발급 되면 별도의 페이지 이동 없이 token 발급 후 다른 api 요청 가능할 듯
      // -> 추후 cakeway 협업에서는 이런 응답 내용에 있어 백과 소통 필요
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      Router.push("/");
    }
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
    part: ["파트 선택", "FrontEnd", "BackEnd"],
  };

  if (!isClient) return null; // 클라이언트에서만 렌더링되도록 설정

  return (
    <Layout>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSubmit}>
        {inputFields.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              type={field.isPassword ? (passwordVisibility[field.name] ? "text" : "password") : field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleInputChange}
              errorMessage={field.name === "password" ? errorMessages.password : field.name === "confirmPassword" ? errorMessages.confirmPassword : ""}
              isPassword={field.isPassword}
              togglePasswordVisibility={() => handlePasswordToggle(field.name as "password" | "confirmPassword")}
            />
          ))}

          {Object.keys(selectOptions).map((key) => (
            <SelectField
              key={key}
              name={key === "team" ? "selectedTeam" : "selectedPart"}
              value={formData[key === "team" ? "selectedTeam" : "selectedPart"]}
              options={selectOptions[key]}
              onChange={handleInputChange}
            />
          ))}

        <Button type="submit">회원가입</Button>
      </FormContainer>
    </Layout>
  );
};

export default SignUp;

const Layout = styled.div`
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    margin-top: 9.375rem;
    @media (max-height: 768px) {
        margin-top: 10%;
    }
`;
