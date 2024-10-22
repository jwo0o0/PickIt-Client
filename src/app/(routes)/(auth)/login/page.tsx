"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginPayload, loginSchema } from "@/utils/schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useLogin } from "@/lib/auth/hooks/useLogin";

export default function LoginPage() {
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isValid } = form.formState;

  const { mutate: loginMutation } = useLogin();

  const onSubmit = (values: LoginPayload) => {
    loginMutation(
      { email: values.email, password: values.password },
      {
        onError: (error) => {
          alert("회원가입에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
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
                {/* <FormLabel className="text-slate-900">이메일</FormLabel> */}
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
                {/* <FormLabel className="text-slate-900">비밀번호</FormLabel> */}
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
          <Button
            type="submit"
            className={`w-80 mt-12 bg-indigo-500 hover:bg-indigo-600`}
          >
            로그인
          </Button>
        </form>
      </Form>
      <div className="flex mt-6">
        <div className="text-body2Normal text-slate-400 font-medium mr-1">
          회원이 아니신가요?
        </div>
        <Link
          href="/signup"
          className="text-body2Normal text-slate-900 font-medium 
          hover:cursor-pointer ml-1 hover:text-indigo-500 
          transition-colors duration-300"
        >
          회원가입 하러 가기
        </Link>
      </div>
    </div>
  );
}
