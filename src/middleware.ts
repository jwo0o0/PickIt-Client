import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인이 필요한 페이지들
const AUTH_PAGES = ["/chat", "/feed/write", "/interest", "/user"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { nextUrl, cookies } = request;
  const accessToken = cookies.get("accessToken");
  const { pathname } = nextUrl;

  if (accessToken) {
    response.cookies.set("isLogin", "true", { httpOnly: false, path: "/" });
  } else {
    response.cookies.set("isLogin", "false", { httpOnly: false, path: "/" });
  }

  // 로그인이 필요한 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}
