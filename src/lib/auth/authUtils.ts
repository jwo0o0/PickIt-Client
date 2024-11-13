import { cookies } from "next/headers";

export async function getAuthHeaders() {
  const accessToken = cookies().get("accessToken")?.value;

  // accessToken이 존재할 경우에만 Cookie 헤더 추가
  return accessToken
    ? {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      }
    : {};
}
