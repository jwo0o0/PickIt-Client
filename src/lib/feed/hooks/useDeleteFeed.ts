import { customFetch, FEED_API } from "@/apis";
import { useMutation } from "@tanstack/react-query";

export const useDeleteFeed = () => {
  return useMutation<{ message: string }, Error, { feedId: number }>({
    mutationFn: async ({ feedId }) => {
      return await customFetch(`${FEED_API.DELETE_FEED}/${feedId}`, {
        method: "DELETE",
      });
    },
  });
};
