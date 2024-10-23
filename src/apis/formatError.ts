const formatErrorMessage = (message: string) => {
  switch (message) {
    case "USER_NOT_FOUND":
      return "사용자를 찾을 수 없습니다.";
    case "PASSWORD_NOT_MATCH":
      return "비밀번호가 일치하지 않습니다.";
    case "FILE_UPLOAD_FAIL":
      return "파일 업로드에 실패했습니다.";
    default:
      return "요청에 실패했습니다.";
  }
};

export default formatErrorMessage;
