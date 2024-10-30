import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { customFetch, FEED_API } from "@/apis";
import { FeedListType } from "../feedTypes";
import feedKeys from "../feedQueries";

export const getAllFeed = async (
  pageParam: number = 1,
  limit: number = 5
): Promise<FeedListType> => {
  return await customFetch(FEED_API.GET_ALL_FEED(pageParam, limit), {
    next: {
      revalidate: 0,
    },
  });
};

export const useGetAllFeed = () => {
  return useInfiniteQuery<FeedListType, Error>({
    queryKey: feedKeys.all,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getAllFeed(pageParam as number),
    getNextPageParam: (lastPage, allPagees) =>
      lastPage.hasNextPage ? allPagees.length + 1 : undefined,
    staleTime: 0,
  });
};

export const prefetchAllFeed = async (queryClient: QueryClient) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: feedKeys.all,
    queryFn: ({ pageParam = 1 }) => getAllFeed(pageParam),
    initialPageParam: undefined,
  });
};
