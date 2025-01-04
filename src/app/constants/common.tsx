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
  이희원, // 0
  최지원, // 1
  지민재, // 2
  김류원, // 3
  송유선, // 4
  강다혜, // 5
  권혜인, // 6
  이가빈, // 7
  박지수, // 8
  윤영준, // 9
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
