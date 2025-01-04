export enum BECandidates {
  나혜인 = 11, // 0
  유지민 = 12, // 1
  황서아 = 13, // 2
  임가현 = 14, // 3
  최서지 = 15, // 4
  김연수 = 16, // 5
  이채원 = 17, // 6
  이한슬 = 18, // 7
  남승현 = 19, // 8
  문서영 = 20, // 9
}

export enum FECandidates {
  윤영준 = 10,
  이희원 = 1,
  최지원 = 2,
  지민재 = 3,
  김류원 = 4,
  송유선 = 5,
  강다혜 = 6,
  권혜인 = 7,
  이가빈 = 8,
  박지수 = 9,
}

export enum demoday {
  PHOTOGROUND = 1,
  ANGELBRIDGE = 2,
  PEDALGENIE = 3,
  CAKEWAY = 4,
  COFFEEDILL = 5,
}

export const VOTE_CONTENT = {
  FE: FECandidates,
  BE: BECandidates,
  TEAM: demoday,
};

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
