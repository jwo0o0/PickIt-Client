import { QueryClient, useQuery } from "@tanstack/react-query";
import feedKeys from "@/lib/feed/feedQueries";
import { customFetch, FEED_API } from "@/apis";
import { FeedContentType } from "@/lib/feed/feedTypes";

const fetchFeed = async (feedId: number): Promise<FeedContentType> => {
  return await customFetch(`${FEED_API.GET_FEED}/${feedId}`);
};

export const useGetFeed = (feedId: number) => {
  return useQuery<FeedContentType>({
    queryKey: feedKeys.content(feedId),
    queryFn: () => fetchFeed(feedId),
    staleTime: 0,
  });
};

export const prefetchFeed = async (
  feedId: number,
  queryClient: QueryClient
) => {
  await queryClient.prefetchQuery({
    queryKey: feedKeys.content(feedId),
    queryFn: () => fetchFeed(feedId),
  });
};
