import { AUTH_API } from "./path";
import { customFetch } from "./customFetch";
import { setCookie } from "cookies-next";

export const refreshAccessToken = async (): Promise<Response> => {
  const baseURL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_PROD_API_URL
      : process.env.NEXT_PUBLIC_DEV_API_URL;

  const response = await fetch(`${baseURL}${AUTH_API.REFRESH}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    customFetch(AUTH_API.LOGOUT);
    setCookie("isLogin", "false", { httpOnly: false, path: "/" });
    throw new Error(errorData?.message || "토큰 갱신 실패");
  }
  return response;
};
