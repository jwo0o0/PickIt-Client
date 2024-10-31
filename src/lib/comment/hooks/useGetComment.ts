import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { customFetch, COMMENT_API } from "@/apis";
import { CommentListType } from "../commentTypes";
import commentKeys from "./commentQueries";

export const getComments = async (
  feedId: number,
  pageParam: number = 1,
  limit: number = 5
): Promise<CommentListType> => {
  return await customFetch(COMMENT_API.GET_COMMENTS(feedId, pageParam, limit));
};

export const useGetComments = (feedId: number) => {
  return useInfiniteQuery<CommentListType, Error>({
    queryKey: commentKeys.feed(feedId),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getComments(feedId, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNextPage ? allPages.length + 1 : undefined,
    refetchOnMount: "always",
  });
};

export const prefetchComments = async (
  feedId: number,
  queryClient: QueryClient,
  limit?: number
) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: commentKeys.feed(feedId),
    queryFn: ({ pageParam = 1 }) =>
      getComments(feedId, pageParam as number, limit),
    initialPageParam: 1,
  });
};
