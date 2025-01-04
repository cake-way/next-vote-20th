"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    username: string; // 유저 이름
    isLoggedIn: boolean; // 로그인 여부
    setUserName: (username: string) => void; // 유저 이름 설정
    login: () => void; // 로그인 처리
    logout: () => void; // 로그아웃 처리
  }
  
  export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        username: "",
        isLoggedIn: false,
        setUserName: (username) => set({ username }),
        login: () => set(() => ({ isLoggedIn: true })),
        logout: () => {
          set(() => ({
            username: "",
            isLoggedIn: false, // zustand 상태 초기화
          }));
          
          localStorage.removeItem("token");
        },
      }),
      {
        name: "loggedUserInfo", // localStorage에 저장될 키 이름
      }
    )
  );