"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupPayload, signupSchema } from "@/utils/schema/authSchema";
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

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useSignup } from "@/lib/auth/hooks/useSignup";
import { setCookie } from "cookies-next";
import formatErrorMessage from "@/apis/formatError";

export default function SignupPage() {
  const { setUser } = useAuthStore();

  const form = useForm<SignupPayload>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      bio: "",
      profileImage: undefined,
    },
  });
  const { setValue } = form;

  const { mutate: signupMutation, isPending, error, isError } = useSignup();

  const onSubmit = (values: SignupPayload) => {
    signupMutation(
      {
        userData: {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
          bio: values.bio,
          profileImage: values.profileImage,
        },
      },
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) setValue("profileImage", file);
  };

  return (
    <div className="min-h-full pt-10 pb-20 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">이메일</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80 mb-5 border-slate-300" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">닉네임</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80 mb-5 border-slate-300" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-80 mb-5 border-slate-300"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-80 mb-5 border-slate-300"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">소개</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-80 mb-5 border-slate-300" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={() => (
                <FormItem className="mb-2">
                  <FormLabel className="text-slate-900">
                    프로필 이미지
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-80 mb-5 border-slate-300"
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
              className={`w-80 mt-8 hover:bg-slate-800 ${
                isPending ? "bg-slate-700" : "bg-slate-900"
              }`}
              disabled={isPending}
            >
              {isPending ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
