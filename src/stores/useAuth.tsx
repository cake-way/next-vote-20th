"use client";
import { create } from "zustand";

interface AuthState {
    username: string; // 유저 이름
    password: string; // 비밀번호
    showPassword: boolean; // 비밀번호 표시 여부
    isLoggedIn: boolean; // 로그인 여부
    setUserName: (username: string) => void; // 유저 이름 설정
    setPassword: (password: string) => void; // 비밀번호 설정
    toggleShowPassword: () => void; // 비밀번호 표시 전환
    login: () => void; // 로그인 처리
    logout: () => void; // 로그아웃 처리
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    username: "",
    password: "",
    showPassword: false,
    isLoggedIn: false,
    setUserName: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    toggleShowPassword: () =>
      set((state) => ({ showPassword: !state.showPassword })),
    login: () => set(() => ({ isLoggedIn: true })), // 로그인 시 상태 변경
    logout: () =>
      set({ username: "", password: "", isLoggedIn: false, showPassword: false }), // 로그아웃 시 초기화
  }));
