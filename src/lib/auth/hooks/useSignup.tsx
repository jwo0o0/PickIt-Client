import { useMutation } from "@tanstack/react-query";
import { AuthUser, UserDTO } from "../types";
import { signUpAPI } from "../api";
import { uploadProfileImage } from "@/lib/user/api";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useSignup = () => {
  const { setUser } = useAuthStore();

  return useMutation<AuthUser, Error, { userData: UserDTO }>({
    mutationFn: async ({ userData }) => {
      const userResponse = await signUpAPI(
        userData.email,
        userData.nickname,
        userData.password,
        userData.bio
      );
      if (userData.profileImage) {
        await uploadProfileImage(userData.profileImage, userResponse.user.id);
      }
      return userResponse;
    },
    onSuccess: (userData) => {
      setUser(userData.user);
    },
    onError: () => {},
  });
};
