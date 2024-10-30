import { QueryClient, useQuery } from "@tanstack/react-query";
import userKeys from "../userQueries";
import { customFetch, USER_API } from "@/apis";
import { FeedType } from "@/lib/feed/feedTypes";

const fetchFeeds = async (userId: number): Promise<FeedType[]> => {
  return await customFetch(`${USER_API.GET_USER_FEEDS}/${userId}/feeds`, {
    method: "GET",
  });
};

export const useGetUserFeeds = (userId: number) => {
  return useQuery<FeedType[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId),
    staleTime: 0,
  });
};

export const prefetchUserFeeds = async (
  userId: number,
  queryClient: QueryClient
) => {
  return queryClient.prefetchQuery<FeedType[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId),
  });
};
