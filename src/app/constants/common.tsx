export enum BECandidates {
  나혜인, // 0
  유지민, // 1
  황서아, // 2
  임가현, // 3
  최서지, // 4
  김연수, // 5
  이채원, // 6
  이한슬, // 7
  남승현, // 8
  문서영, // 9
}

export enum FECandidates {
  윤영준,
  이희원, // 0 윤영준
  최지원, // 1 이희원
  지민재, // 2 최지원
  김류원, // 3 지민재
  송유선, // 4 김류원
  강다혜, // 5 송유선
  권혜인, // 6 박지수
  이가빈, // 7 강다혜
  박지수, // 8 이가빈
}

export enum demoday {
  PHOTOGROUND,
  ANGELBRIDGE,
  PEDALGENIE,
  CAKEWAY,
  COFFEEDILL,
}

export const VOTE_CONTENT = {
  FE: FECandidates,
  BE: BECandidates,
  TEAM: demoday,
};

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
