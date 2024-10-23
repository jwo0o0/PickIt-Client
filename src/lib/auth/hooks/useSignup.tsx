import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthUser, UserDTO } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { customFetch, AUTH_API } from "@/apis";
import { uploadProfileImage } from "@/lib/user/api";

export const useSignup = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  return useMutation<AuthUser, Error, { userData: UserDTO }>({
    mutationFn: async ({ userData }) => {
      // signup
      const userResponse = await customFetch(AUTH_API.SIGNUP, {
        method: "POST",
        body: JSON.stringify({
          email: userData.email,
          nickname: userData.nickname,
          password: userData.password,
          bio: userData.bio,
        }),
      });
      // profile image upload
      if (userData.profileImage) {
        await uploadProfileImage(userData.profileImage, userResponse.user.id);
      }
      return userResponse;
    },
    onSuccess: (userData) => {
      console.log(userData);
      setUser(userData.user);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: () => {},
  });
};
