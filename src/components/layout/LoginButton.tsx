"use client";
import { useLoginStatus } from "@/lib/auth/hooks/useLoginStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginButton = () => {
  const { isLogin, isLoading } = useLoginStatus();
  return (
    <>
      {!isLoading && !isLogin && (
        <Button className="fixed top-4 right-4 bg-indigo-500 hover:bg-indigo-600 hidden md:block">
          <Link href="/login" scroll={false}>
            로그인
          </Link>
        </Button>
      )}
    </>
  );
};
