import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const isLogin = cookieStore.get("isLogin")?.value || "false";
  return NextResponse.json({ isLogin });
}
