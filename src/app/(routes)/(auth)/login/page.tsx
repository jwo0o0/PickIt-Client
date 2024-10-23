"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginPayload, loginSchema } from "@/utils/schema";
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

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: loginMutation, isError, error } = useLogin();

  const onSubmit = (values: LoginPayload) => {
    loginMutation(
      { email: values.email, password: values.password },
      {
        onSuccess: (userData) => {
          setUser(userData.user);
          console.log(useAuthStore.getState().user);
          router.push("/");
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
          {isError && (
            <FormMessage className="mt-2 text-slate-700">
              {formatErrorMessage(error?.message)}
            </FormMessage>
          )}
          <Button
            type="submit"
            className={`w-80 mt-8 bg-indigo-500 hover:bg-indigo-600`}
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
