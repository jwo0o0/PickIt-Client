"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { customFetch, AUTH_API } from "@/apis";
import { setCookie } from "cookies-next";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return customFetch(AUTH_API.LOGOUT, {
        method: "POST",
      });
    },
    onSuccess: () => {
      logout();
      setCookie("isLogin", "false", { httpOnly: false, path: "/" });
      router.push("/");
    },
    onError: () => {
      logout();
      setCookie("isLogin", "false", { httpOnly: false, path: "/" });
      router.push("/");
    },
  });
};
