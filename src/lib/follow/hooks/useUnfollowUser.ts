import { useMutation } from "@tanstack/react-query";
import { customFetch, FOLLOW_API } from "@/apis";

export const useUnfollowUser = () => {
  return useMutation<{ message: string }, Error, { userId: number }>({
    mutationFn: async ({ userId }) => {
      return await customFetch(FOLLOW_API.UNFOLLOW_USER(userId), {
        method: "DELETE",
      });
    },
  });
};
