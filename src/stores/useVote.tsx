import { create } from "zustand";
interface StoreState {
  vote_id: string;
  user_id: string;
  leader_id: string;
  setVoteId: (toLocaleDateString: string) => void;
  setUserId: (id: string) => void;
  setLeaderId: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  vote_id: "2024. 12. 30.",
  user_id: "",
  leader_id: "",

  setVoteId: (toLocaleDateString: string) =>
    set({ vote_id: toLocaleDateString }),
  setUserId: (id: string) => set({ user_id: id }),
  setLeaderId: (id: string) => set({ leader_id: id }),
}));
