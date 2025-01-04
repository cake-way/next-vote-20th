"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import InputField from "@/components/signup/InputField";
import SelectField from "@/components/signup/SelectField";
import Modal from "@/components/Modal";
import { handleError } from "@/utils/errorHandle";

import { validatePassword } from "../lib/validate";
import { apiRequest } from "../lib/api";

const SignUp: React.FC = () => {
  const router = useRouter();

  const [modalState, setModalState] = useState<{ isOpen: boolean, message: string }>({
    isOpen: false,
    message: "",
  });

  // 비밀번호 가시성 상태 관리
  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  // 폼 데이터 상태 관리
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

  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean | null>(null);

  // 클라이언트 확인 (useEffect 내에서만 실행되도록)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  // 비밀번호 유효성 검사
  const handlePasswordValidation = useCallback((password: string, currentValue: string, field: "password" | "confirmPassword") => {
    let errorMessage = "";

    if (field === "password") {
      errorMessage = validatePassword(currentValue);
      setErrorMessages((prev) => ({ ...prev, password: errorMessage }));
    }

    if (field === "confirmPassword") {
      errorMessage =
        currentValue !== password ? "비밀번호가 일치하지 않습니다." : "";
      setErrorMessages((prev) => ({ ...prev, confirmPassword: errorMessage }));
    }
  }, []);

  // 입력 폼 변화 감지
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 입력값에 따라 formData 상태를 업데이트
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // 비밀번호 확인 필드가 비어 있으면 에러 메시지 지우기
    if (name === "confirmPassword" && value === "") {
      setErrorMessages((prev) => ({ ...prev, confirmPassword: "" }));
    }

    // 비밀번호와 비밀번호 확인에 대한 유효성 검사
    if (name === "password" || name === "confirmPassword") {
      handlePasswordValidation(formData.password, value, name);
    }
  }, [formData.password, handlePasswordValidation]);

  const handlePasswordToggle = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, name, username, email, selectedTeam, selectedPart } = formData;

    const signupRequest = {
      username,
      password,
      email,
      name,
      part: selectedPart.toUpperCase(),
      team: selectedTeam.toUpperCase(),
    };
  
    try {
      const response = await apiRequest("auth", "POST", signupRequest, "signup");

      console.log("회원가입 성공:", response);
      setModalState({ isOpen: true, message: "회원가입 완료!" })
      setIsSignupSuccess(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
      setModalState({ isOpen: true, message: handleError("signup_failed")})
      setIsSignupSuccess(false);
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, message: "" })

    if (isSignupSuccess) {
      router.push("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    }
    // 모달이 닫히고 난 후 페이지 새로고침 (Form 초기화 목적)
    if (!isSignupSuccess) {
      window.location.reload();
    }
  };

  // 입력 필드 설정
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

  // 셀렉트 필드 옵션 설정
  const selectOptions: { [key: string]: string[] } = {
    team: [
      "팀명 선택",
      "CakeWay",
      "페달지니",
      "PhotoGround",
      "커피딜",
      "엔젤브릿지",
    ],
    part: ["파트 선택", "FrontEnd", "BackEnd"],
  };

  // 입력 필드에 전달할 props 객체 -> return 문에서는 스프레드 연산자 사용
  const inputFieldProps = inputFields.map((field) => ({
    name: field.name,
    type: field.isPassword ? (passwordVisibility[field.name] ? "text" : "password") : field.type,
    placeholder: field.placeholder,
    value: formData[field.name],
    onChange: handleInputChange,
    errorMessage:
      field.name === "password" ? errorMessages.password : field.name === "confirmPassword" ? errorMessages.confirmPassword : "",
    isPassword: field.isPassword,
    togglePasswordVisibility: () => handlePasswordToggle(field.name as "password" | "confirmPassword"),
  }));

  // 셀렉트 필드에 전달할 props 객체
  const selectFieldProps = Object.keys(selectOptions).map((key) => ({
    name: key === "team" ? "selectedTeam" : "selectedPart",
    value: formData[key === "team" ? "selectedTeam" : "selectedPart"],
    options: selectOptions[key],
    onChange: handleInputChange,
  }));

  if (!isClient) return null; // 클라이언트에서만 렌더링되도록 설정

  const isFormValid = Object.values(formData).every((value) => value !== ""); // // formData의 값 중 하나라도 빈 문자열이면 회원가입 버튼 비활성화
  const hasErrorMessages = errorMessages.password !== "" || errorMessages.confirmPassword !== ""; // errorMessages가 빈 문자열이 아니면 회원가입 버튼 비활성화
  
  return (
    <Layout>
      <Title>회원가입</Title>
      <FormContainer onSubmit={handleSubmitForm}>
        {inputFieldProps.map((props, index) => (
          <InputField key={index} {...props} />  // key는 index로 설정
        ))}

        {selectFieldProps.map((props, index) => (
          <SelectField key={index} {...props} /> 
        ))}
        <Button
          type="submit"
          disabled={!isFormValid || hasErrorMessages} // 상수로 관리된 값을 사용
        >
          회원가입
        </Button>
        <Modal isOpen={modalState.isOpen} message={modalState.message} onClose={handleCloseModal} />
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
  margin-top: 1rem;
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
