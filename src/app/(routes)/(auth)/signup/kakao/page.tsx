"use client";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { KakaoPayload, kakaoSignupSchema } from "@/utils/authSchema";
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
import { useKakaoSignup } from "@/lib/auth/hooks/useKakaoSignup";
import { setCookie } from "cookies-next";

export default function KakaoSignupPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const nickname = searchParams.get("nickname");

  const { setUser } = useAuthStore();

  const form = useForm<KakaoPayload>({
    resolver: zodResolver(kakaoSignupSchema),
    defaultValues: {
      email: "",
      bio: "",
      profileImage: undefined,
    },
  });
  const { setValue } = form;

  const { mutate: signupMutation, isPending } = useKakaoSignup();

  const onSubmit = (values: KakaoPayload) => {
    signupMutation(
      {
        userId: Number(userId),
        email: values.email,
        bio: values.bio,
        profileImage: values.profileImage,
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
        onError: () => {
          alert("회원가입에 실패했습니다.");
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
          <FormItem className="mb-2 w-[320px]">
            <FormLabel className="text-slate-900">닉네임</FormLabel>
            <Input value={nickname || ""} disabled className="text-slate-950" />
          </FormItem>
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
