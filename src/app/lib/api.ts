import { getToken } from "@/utils/utils";

// 기본적인 fetch 요청 함수
const fetchData = async (
  url: string,
  method: string,
  body: Record<string, unknown> | null = null
) => {
  console.log("Fetch called with:", { url, method, body });
  console.log("Request URL:", url);
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
  console.log(body);
  const response = await fetch(url, options);

  console.log("Response status:", response.status);
  // console.log("data:" + (await response.json()));

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

    case "demodayVote":
      baseUrl = "/api/vote/demoday";
      break;
    case "results":
      baseUrl = "/api/results";
      break;
    case "leader":
      baseUrl = "/api/leader";
      break;
    default:
      throw new Error("Unknown domain");
  }

  // 완전한 URL 생성 (baseUrl + endpoint)
  const fullUrl = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;
  console.log("fullUrl t:" + fullUrl);
  console.log("fullUrl endpoint:" + endpoint);

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

    // if (!results.ok) {
    //   throw new Error(`${results.errorCode} 결과 조회 중 오류가 발생했습니다`);
    // }이거 왜안돼?
    return results;
  } catch (error) {
    console.error("투표 결과 가져오기 실패", error);
  }
};

//파트장, 데모데이 투표하기 POST 요청
export const fetchPostVote = async (endpoint: string, demoday: boolean) => {
  const response = await apiRequest(
    `${demoday}` ? "demodayVote" : "vote",
    "POST",
    null,
    endpoint
  );
  console.log("파트장투표하기 endpoint:" + endpoint);

  // if (!response.ok) {
  //   throw new Error(`${response.errorCode} 투표 중 오류가 발생했습니다`);
  // }
  return response;
};

//

//후보자 조회
export const fetchGetLeader = async (endpoint: string) => {
  try {
    const response = await apiRequest("leader", "GET", null, endpoint);

    // if (!response.ok) {
    //   throw new Error(
    //     `${response.errorCode} 후보자 조회 중 오류가 발생했습니다`
    //   );
    // }
    console.log("후보자조회 결과", response);
    return response;
  } catch (error) {
    console.error("후보자조회실패", error);
  }
};
