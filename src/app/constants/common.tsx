type VoteItem = {
  name: string;
  voteData: number;
};

export const VOTE_CONTENT: {
  FE: VoteItem[];
  BE: VoteItem[];
  TEAM: VoteItem[];
} = {
  FE: [
    { name: "강다혜", voteData: 1 },

    { name: "권혜인", voteData: 2 },

    { name: "김류원", voteData: 10 },
    { name: "박지수", voteData: 3 },
    { name: "송유선", voteData: 4 },
    { name: "윤영준", voteData: 5 },
    { name: "이가빈", voteData: 6 },
    { name: "이희원", voteData: 7 },
    { name: "지민재", voteData: 9 },
    { name: "최지원", voteData: 8 },
  ],

  BE: [
    { name: "김연수", voteData: 1 },
    { name: "나혜인", voteData: 10 },
    { name: "남승현", voteData: 1 },
    { name: "문서영", voteData: 1 },
    { name: "유지민", voteData: 10 },
    { name: "이채원", voteData: 1 },
    { name: "이한슬", voteData: 1 },
    { name: "임가현", voteData: 1 },
    { name: "최서지", voteData: 1 },

    { name: "황서아", voteData: 1 },
  ],
  TEAM: [
    { name: "포토그라운드", voteData: 11 },
    { name: "엔젤브릿지", voteData: 11 },
    { name: "커피딜", voteData: 11 },
    { name: "케이크WAY", voteData: 21 },
    { name: "페달지니", voteData: 11 },
  ],
};

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
