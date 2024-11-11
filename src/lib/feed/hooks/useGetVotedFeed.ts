import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { customFetch, FEED_API } from "@/apis";
import { FeedListType } from "../feedTypes";
import feedKeys from "../feedQueries";

export const getVotedFeed = async (
  pageParam: number = 1,
  limit: number = 5,
  options?: RequestInit
): Promise<FeedListType> => {
  return await customFetch(FEED_API.GET_VOTED_FEED(pageParam, limit), options);
};

export const useGetVotedFeed = () => {
  return useInfiniteQuery<FeedListType, Error>({
    queryKey: feedKeys.voted,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getVotedFeed(pageParam as number),
    getNextPageParam: (lastPage, allPagees) =>
      lastPage.hasNextPage ? allPagees.length + 1 : undefined,
  });
};

export const prefetchVotedFeed = async (
  QueryClient: QueryClient,
  options?: RequestInit,
  limit?: number
) => {
  await QueryClient.prefetchInfiniteQuery({
    queryKey: feedKeys.voted,
    queryFn: ({ pageParam = 1 }) =>
      getVotedFeed(pageParam as number, limit, options),
    initialPageParam: undefined,
  });
};
