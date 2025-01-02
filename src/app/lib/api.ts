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
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
  console.log("Response status:", response.status);

  if (!response.ok) {
    // 에러 처리
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 도메인별 요청 처리
export const apiRequest = async (
  domain: string,
  method: string = "GET",
  body: Record<string, unknown> | null = null,
  endpoint: string = "", 
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
    case "result":
      baseUrl = "/api/result";
      break;
    default:
      throw new Error("Unknown domain");
  }

  // 완전한 URL 생성 (baseUrl + endpoint)
  const fullUrl = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;

  // 메서드에 따른 처리
  if (method === "POST") {
    const response = await fetchData(fullUrl, method, body);
    console.log("Fetch 응답:", response); // Fetch 응답 확인
    return response;
  } else if (method === "GET") {
    return fetchData(fullUrl, "GET");
  } else {
    throw new Error("Unsupported HTTP method");
  }
};

// 투표 결과를 가져오는 GET 요청
export const fetchVoteResults = async () => {
  try {
    const results = await apiRequest("result", "GET");
    console.log("투표 결과", results);

    if (!results.ok) {
      throw new Error(`${results.errorCode} 결과 조회 중 오류가 발생했습니다`);
    }
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
    throw new Error(`${response.errorCode} 후보자 조회 중 오류가 발생했습니다`);
  }
};

