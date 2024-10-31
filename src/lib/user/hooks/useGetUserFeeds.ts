import { QueryClient, useQuery } from "@tanstack/react-query";
import userKeys from "../userQueries";
import { customFetch, USER_API } from "@/apis";
import { FeedType } from "@/lib/feed/feedTypes";

const fetchFeeds = async (
  userId: number,
  options?: RequestInit
): Promise<FeedType[]> => {
  return await customFetch(USER_API.GET_USER_FEEDS(userId), {
    ...options,
    method: "GET",
  });
};

export const useGetUserFeeds = (userId: number) => {
  return useQuery<FeedType[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId),
    refetchOnMount: "always",
  });
};

export const prefetchUserFeeds = async (
  userId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  return queryClient.prefetchQuery<FeedType[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId, options),
  });
};
