"use client";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginPayload, loginSchema } from "@/utils/schema/authSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "@/lib/auth/hooks/useLogin";
import { useAuthStore } from "@/store/auth/useAuthStore";
import formatErrorMessage from "@/apis/formatError";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: loginMutation, isError, error, isPending } = useLogin();

  const onSubmit = (values: LoginPayload) => {
    loginMutation(
      { email: values.email, password: values.password },
      {
        onSuccess: (userData) => {
          setUser(userData.user);
          setCookie("isLogin", "true", {
            httpOnly: false,
            path: "/",
          });
          window.location.href = "/";
        },
      }
    );
  };

  const handleClickKakaoLogin = () => {
    const url = `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : process.env.NEXT_PUBLIC_DEV_API_URL
    }/auth/kakao`;
    window.location.href = url;
  };

  return (
    <div className="full-viewport-height flex flex-col justify-center items-center">
      <div className="mb-6 text-headline1 font-bold text-slate-900">
        로그인 하기
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormControl>
                  <Input
                    placeholder="이메일"
                    {...field}
                    className="w-80 h-12 border border-slate-300"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="비밀번호"
                    {...field}
                    type="password"
                    className="w-80 h-12 border border-slate-300"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          {isError && (
            <FormMessage className="mt-2 text-slate-700">
              {formatErrorMessage(error?.message)}
            </FormMessage>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className={`w-80 mt-8 ${
              isPending ? "bg-indigo-400" : "bg-indigo-500"
            } hover:bg-indigo-600`}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </Form>
      <button className="mt-2" onClick={handleClickKakaoLogin}>
        <Image
          src="/images/kakao_login.webp"
          alt="카카오 로그인"
          width="320"
          height="40"
          priority={true}
        />
      </button>
      <div className="flex mt-6">
        <div className="text-body2Normal text-slate-400 font-medium mr-1">
          회원이 아니신가요?
        </div>
        <Link
          href="/signup"
          className="text-body2Normal text-slate-900 font-medium 
          hover:cursor-pointer ml-1 hover:text-indigo-500 
          transition-colors duration-300"
          scroll={false}
        >
          회원가입 하러 가기
        </Link>
      </div>
    </div>
  );
}
