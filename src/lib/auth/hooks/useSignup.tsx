import { useMutation } from "@tanstack/react-query";
import { AuthUser, UserDTO } from "../types";
import { customFetch, AUTH_API } from "@/apis";
import { uploadProfileImage } from "@/lib/user/api";

export const useSignup = () => {
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
  });
};
