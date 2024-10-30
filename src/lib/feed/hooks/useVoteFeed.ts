import { customFetch, FEED_API } from "@/apis";
import { useMutation } from "@tanstack/react-query";

export const useVoteFeed = () => {
  return useMutation<
    { message: string },
    Error,
    { feedId: number; pollItem: number }
  >({
    mutationFn: async ({ feedId, pollItem }) => {
      return await customFetch(`${FEED_API.VOTE_FEED}/${feedId}/vote`, {
        method: "POST",
        body: JSON.stringify({ pollItem }),
      });
    },
  });
};
