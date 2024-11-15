import { QueryClient, useQuery } from "@tanstack/react-query";
import feedKeys from "@/lib/feed/feedQueries";
import { customFetch, FEED_API } from "@/apis";
import { FeedType } from "@/lib/feed/feedTypes";

export const fetchFeed = async (
  feedId: number,
  options?: RequestInit
): Promise<FeedType> => {
  return await customFetch(FEED_API.GET_FEED(feedId), {
    ...options,
    method: "GET",
  });
};

export const useGetFeed = (feedId: number) => {
  return useQuery<FeedType>({
    queryKey: feedKeys.content(feedId),
    queryFn: () => fetchFeed(feedId),
    refetchOnMount: "always",
  });
};

export const prefetchFeed = async (
  feedId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery({
    queryKey: feedKeys.content(feedId),
    queryFn: () => fetchFeed(feedId, options),
  });
};
