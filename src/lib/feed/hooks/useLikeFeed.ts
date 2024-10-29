import { customFetch, FEED_API } from "@/apis";
import { useMutation } from "@tanstack/react-query";

export const useLikeFeed = () => {
  return useMutation<{ message: string }, Error, { feedId: number }>({
    mutationFn: async ({ feedId }) => {
      return await customFetch(`${FEED_API.LIKE_FEED}/${feedId}/like`, {
        method: "POST",
      });
    },
  });
};
