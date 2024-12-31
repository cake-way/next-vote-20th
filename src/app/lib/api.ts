// 기본적인 fetch 요청 함수
const fetchData = async (url: string, method: string = "GET", body: Record<string, unknown> | null = null) => {  // body 타입을 Record<string, unknown>으로 지정
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) { // 에러 처리
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  
  // 도메인별 요청 처리 
  export const apiRequest = async (domain: string, method: string = "GET", body: Record<string, unknown> | null = null) => {  // body 타입을 Record<string, unknown>으로 지정
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
  
    // 메서드에 따른 처리
    if (method === "POST") {
      return fetchData(baseUrl, "POST", body);
    } else if (method === "GET") {
      return fetchData(baseUrl, "GET");
    } else {
      throw new Error("Unsupported HTTP method");
    }
  };
  

// 투표 결과를 가져오는 GET 요청 예시
{/*const fetchVoteResults = async () => {
  try {
    const results = await apiRequest("result", "GET");
    console.log("투표 결과", results);
  } catch (error) {
    console.error("투표 결과 가져오기 실패", error);
  }
};*/}

// 회원가입을 위한 POST 요청 예시시
{/*const handleSignUp = async (userData) => {
    try {
      const result = await apiRequest("auth", "POST", userData);
      console.log("회원가입 성공", result);
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };*/}