import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { customFetch, FEED_API } from "@/apis";
import { FeedListType } from "../feedTypes";
import feedKeys from "../feedQueries";

export const getLikedFeed = async (
  pageParam: number = 1,
  limit: number = 5,
  options?: RequestInit
): Promise<FeedListType> => {
  return await customFetch(FEED_API.GET_LIKED_FEED(pageParam, limit), options);
};

export const useGetLikedFeed = () => {
  return useInfiniteQuery<FeedListType, Error>({
    queryKey: feedKeys.liked,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getLikedFeed(pageParam as number),
    getNextPageParam: (lastPage, allPagees) =>
      lastPage.hasNextPage ? allPagees.length + 1 : undefined,
  });
};

export const prefetchLikedFeed = async (
  QueryClient: QueryClient,
  options?: RequestInit,
  limit?: number
) => {
  await QueryClient.prefetchInfiniteQuery({
    queryKey: feedKeys.liked,
    queryFn: ({ pageParam = 1 }) =>
      getLikedFeed(pageParam as number, limit, options),
    initialPageParam: undefined,
  });
};
