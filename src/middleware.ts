import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인이 필요한 페이지들
const AUTH_PAGES = ["/chat", "/feed/write", "/interest", "/user"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  const isLogin = cookies.get("isLogin")?.value === "true";

  // 로그인이 필요한 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (!isLogin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}
