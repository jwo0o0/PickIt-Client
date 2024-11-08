"use client";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

export default function KakaoLoginPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const nickname = searchParams.get("nickname");
  const email = searchParams.get("email");

  const { setUser } = useAuthStore();

  useEffect(() => {
    if (id && nickname && email) {
      setUser({
        id: Number(id),
        nickname,
        email,
      });
      setCookie("isLogin", "true", {
        httpOnly: false,
        path: "/",
      });
    }
    window.location.href = "/";
  }, []);
  return <></>;
}
