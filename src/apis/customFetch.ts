import { refreshAccessToken } from "./auth";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_DEV_API_URL;

export const customFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      const errorData = await response.json();
      // accessToken expired
      if (errorData.message === "ACCESS_TOKEN_EXPIRED") {
        await refreshAccessToken();
        const retryResponse = await fetch(`${baseURL}${url}`, {
          ...options,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
        });
        if (!retryResponse.ok) {
          const retryErrorData = await retryResponse.json();
          throw new Error(retryErrorData?.message || "요청에 실패했습니다.");
        }
        return retryResponse.json();
      }
    }
    const errorData = await response.json();
    throw new Error(errorData?.message || "요청에 실패했습니다.");
  }
  return response.json();
};

export const customFormFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${baseURL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "요청에 실패했습니다.");
  }

  return response.json();
};
