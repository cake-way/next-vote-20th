import { create } from "zustand";

//투표정보는 전역상태관리를 사용할 필요가 없으나
//zustand 연습해보려구 작성한 코드입니다...ㅎ
interface StoreState {
  vote_id: number;
  member: string;
  candidate: string;
  setVoteId: (timestamp: number) => void;
  setMember: (id: string) => void;
  setCandidate: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  vote_id: new Date("2024-12-30").getTime(),
  member: "",
  candidate: "",

  setVoteId: (timestamp: number) => set({ vote_id: timestamp }),
  setMember: (id: string) => set({ member: id }),
  setCandidate: (id: string) => set({ candidate: id }),
}));
