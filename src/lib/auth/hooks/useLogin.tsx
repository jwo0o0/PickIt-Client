import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { AuthUser } from "../types";
import { customFetch, AUTH_API } from "@/apis";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation<AuthUser, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      return customFetch(AUTH_API.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
    },
    onSuccess: (userData) => {
      setUser(userData.user);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });
};
