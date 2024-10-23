import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { customFetch, AUTH_API } from "@/apis";

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
      router.push("/");
    },
    onError: () => {
      logout();
      router.push("/");
    },
  });
};
