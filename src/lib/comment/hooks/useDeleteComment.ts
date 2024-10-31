import { customFetch, COMMENT_API } from "@/apis";
import { useMutation } from "@tanstack/react-query";

export const useDeleteComment = () => {
  return useMutation<{ message: string }, Error, { commentId: number }>({
    mutationFn: async ({ commentId }) => {
      return await customFetch(COMMENT_API.DELETE_COMMENT(commentId), {
        method: "DELETE",
      });
    },
  });
};
