import { AUTH_API } from "./path";
export const refreshAccessToken = async (): Promise<Response> => {
  const response = await fetch(AUTH_API.REFRESH, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.message === "REFRESH_TOKEN_EXPIRED") {
      throw new Error("REFRESH_TOKEN_EXPIRED");
    }
    throw new Error("토큰 갱신 실패");
  }
  return response;
};
