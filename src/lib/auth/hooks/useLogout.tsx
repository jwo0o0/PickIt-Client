import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { logoutAPI } from "../api";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutAPI,
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
