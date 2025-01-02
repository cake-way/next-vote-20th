"use client"

import { useRouter } from "next/navigation";
import Image from "next/image"; 
import styled from "styled-components";

import { useAuthStore } from "@/stores/useAuth";

const Header: React.FC = () => {
  const router = useRouter();
  const { username, isLoggedIn, logout } = useAuthStore(); // 전역 상태 가져오기

  const handleLogoutButtonClick = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    logout();
  };

  const handleLogoClick = () => {
    router.push("/"); 
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>
        <Image src="/logo.svg" width={100} height={40} alt="Logo" />
      </Logo>
      <Nav>
        {isLoggedIn ? (
          <UserInfo>
            <span>{username}</span>
            <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
          </UserInfo>
        ) : (
          <AuthButtons>
            <Button onClick={() => router.push("/login")}>로그인</Button>
            <Button onClick={() => router.push("/signup")}>회원가입</Button>
          </AuthButtons>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  @media (max-width: 29rem) {
    font-size: 0.8rem;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const Button = styled.button`
  background-color: #ffffff;
  color: black;
  border: none;
  padding: 0.3125rem 0.625rem;
  border: 0.125rem solid rgb(255, 108, 129);
  border-radius: 0.3125rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 108, 129);
    color: #ffffff;
    transition: 0.2s;
  }
  @media (max-width: 29rem) {
    font-size: 0.625rem;
  }
`;
