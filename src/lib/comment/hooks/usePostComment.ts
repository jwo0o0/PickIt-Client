import { useMutation } from "@tanstack/react-query";
import { PostCommentResponse } from "../commentTypes";
import { customFetch, COMMENT_API } from "@/apis";

export const usePostComment = () => {
  return useMutation<
    PostCommentResponse,
    Error,
    { feedId: number; content: string }
  >({
    mutationFn: async ({ feedId, content }) => {
      return await customFetch(COMMENT_API.POST_COMMENT(feedId), {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
  });
};
