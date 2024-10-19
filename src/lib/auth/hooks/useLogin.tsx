import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { loginAPI } from "../api";
import { AuthUser } from "../types";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation<AuthUser, Error, { email: string; password: string }>({
    mutationFn: loginAPI,
    onSuccess: (userrData) => {
      setUser(userrData.user);
      router.push("/");
    },
    onError: () => {},
  });
};
