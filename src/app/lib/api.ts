import { getToken } from "@/utils/utils";

interface Votedata {
  vote_id: string;
  user_id: string;
  leader_id: string;
}

// 기본적인 fetch 요청 함수
const fetchData = async (
  url: string,
  method: string,
  body: Record<string, unknown> | null = null
) => {
  console.log("Fetch called with:", { url, method, body });

  const token = await getToken();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  console.log("Response status:", response.status);

  if (!response.ok) {
    // 응답에 에러 정보가 있는지 확인
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// 도메인별 요청 처리
export const apiRequest = async (
  domain: string,
  method: string = "GET",
  body: Record<string, unknown> | null = null,
  endpoint: string = ""
) => {
  // 도메인별 기본 URL 설정
  let baseUrl = "";

  switch (domain) {
    case "auth":
      baseUrl = "/api/auth";
      break;
    case "vote":
      baseUrl = "/api/vote";
      break;
    case "results":
      baseUrl = "/api/results";
      break;
    case "leader":
      baseUrl = "/api/leader";
    default:
      throw new Error("Unknown domain");
  }

  // 완전한 URL 생성 (baseUrl + endpoint)
  const fullUrl = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;

  // 메서드에 따른 처리
  if (method === "POST") {
    return fetchData(fullUrl, method, body);
  } else if (method === "GET") {
    return fetchData(fullUrl, "GET");
  } else {
    throw new Error("Unsupported HTTP method");
  }
};

// 투표 결과를 가져오는 GET 요청
export const fetchVoteResults = async (endpoint: string) => {
  try {
    const results = await apiRequest("results", "GET", null, endpoint);
    console.log("투표 결과", results);

    if (!results.ok) {
      throw new Error(`${results.errorCode} 결과 조회 중 오류가 발생했습니다`);
    }
    return results;
  } catch (error) {
    console.error("투표 결과 가져오기 실패", error);
  }
};

//투표하기 POST 요청
export const fetchPostVote = async ({
  vote_id,
  user_id,
  leader_id,
}: Votedata) => {
  const response = await apiRequest("vote", "POST", {
    vote_id,
    user_id,
    leader_id,
  });

  if (!response.ok) {
    throw new Error(`${response.errorCode} 투표 중 오류가 발생했습니다`);
  }
  return response;
};

//후보자 조회
export const fetchGetLeader = async (endpoint: string) => {
  const response = await apiRequest("");
};
