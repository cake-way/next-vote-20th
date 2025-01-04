const errorMessages: Record<string, string> = {
    vote_result: "투표 결과를 불러오는 데 실패했습니다. 다시 시도해주세요.",
    login_failed: "아이디 또는 비밀번호를 다시 입력해 주세요.",
    signup_failed: "회원가입 도중 오류가 발생했습니다.\n 정보를 다시 확인해 주세요.",
    network_error: "네트워크 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.",
    unauthorized: "권한이 없습니다. 로그인 후 다시 시도해주세요.",
    unknown: "알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.",
  };
  
  export function handleError(key: string): string {
    // 키가 없으면 기본 메시지 반환
    return errorMessages[key] || "오류가 발생했습니다. 다시 시도해주세요.";
  }
  