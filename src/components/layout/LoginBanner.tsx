"use client";
import { useLoginStatus } from "@/lib/auth/hooks/useLoginStatus";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginBanner = () => {
  const { isLogin, isLoading } = useLoginStatus();
  return (
    <>
      {!isLoading && !isLogin && (
        <div
          className="md:hidden fixed top-0 left-0 right-0 w-full h-20
                     bg-white bg-opacity-85 z-40
                    flex items-center justify-center"
        >
          <Button className="w-48 max-w-[40%] mr-2 bg-slate-200 text-slate-900 hover:bg-slate-300">
            <Link href="/login" scroll={false}>
              로그인
            </Link>
          </Button>
          <Button className="w-48 max-w-[40%] ml-2 bg-indigo-500 hover:bg-indigo-600">
            <Link href="/login" scroll={false}>
              회원가입
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};
