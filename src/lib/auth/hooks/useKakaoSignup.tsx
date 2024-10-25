import { useMutation } from "@tanstack/react-query";
import { AuthUser } from "../types";
import { customFetch, AUTH_API } from "@/apis";
import { uploadProfileImage } from "@/lib/user/api";

export const useKakaoSignup = () => {
  return useMutation<
    AuthUser,
    Error,
    {
      userId: number;
      email: string;
      bio?: string;
      profileImage?: File | null;
    }
  >({
    mutationFn: async ({ userId, email, bio, profileImage }) => {
      // kakao signup
      const userResponse = await customFetch(AUTH_API.KAKAO_SIGNUP, {
        method: "PATCH",
        body: JSON.stringify({
          userId,
          email,
          bio,
        }),
      });
      if (profileImage) {
        await uploadProfileImage(profileImage, userId);
      }
      return userResponse;
    },
  });
};
