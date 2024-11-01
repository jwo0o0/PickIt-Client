import { useMutation } from "@tanstack/react-query";
import { FollowUserResponse } from "../followTypes";
import { customFetch, FOLLOW_API } from "@/apis";

export const useFollowUser = () => {
  return useMutation<
    FollowUserResponse,
    Error,
    {
      userId: number;
    }
  >({
    mutationFn: async ({ userId }) => {
      return await customFetch(FOLLOW_API.FOLLOW_USER(userId), {
        method: "POST",
      });
    },
  });
};
