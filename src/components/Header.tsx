"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Image from "next/image"; 

const Header:React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

   // 초기 렌더링 시 로컬 스토리지에서 유저 정보를 가져오기
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 로컬 스토리지에 값이 없으면, 기본 유저 데이터 저장 -> test를 위해 임시로 설정
      const defaultUser = { name: "FE 지민재" };
      localStorage.setItem("user", JSON.stringify(defaultUser));
      setUser(defaultUser);
    }
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleLogoutClick = () => {
    // 로그아웃 시 로컬 스토리지에서 유저 정보 제거
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogoClick = () => {
    router.push("/");  // 홈 페이지로 이동
  };

  return (
    <HeaderContainer>
        <Logo onClick={handleLogoClick}>
            <Image src="/logo.svg" width={100} height={40}  alt="Logo" />
        </Logo>
        <Nav>
            {user ? (
            <UserInfo>
                <span>{user.name}</span>
                <Button onClick={handleLogoutClick}>로그아웃</Button>
            </UserInfo>
            ) : (
            <AuthButtons>
                <Button onClick={handleLoginClick}>로그인</Button>
                <Button onClick={handleSignupClick}>회원가입</Button>
            </AuthButtons>
            )}
        </Nav>
    </HeaderContainer>
  );
}

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
