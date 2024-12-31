export const validatePassword = (password: string) => { // 유효성 검사
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    const containsKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (!password) {
      return ""; // 비어 있을 경우 에러 메시지 지움
    }

    if (containsKorean.test(password)) {
      return "비밀번호에 한글을 포함할 수 없습니다.";
    }

    if (password.length < 8 || password.length > 12) {
      return "비밀번호는 8~12자리여야 합니다.";
    }

    if (!/[A-Z]/.test(password)) {
      return "비밀번호에 최소 1개의 대문자가 포함되어야 합니다.";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "비밀번호에 최소 1개의 특수문자가 포함되어야 합니다.";
    }

    if (!regex.test(password)) {
      return "비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    return "";
  };