import { QueryClient, useQuery } from "@tanstack/react-query";
import userKeys from "../userQueries";
import { customFetch, USER_API } from "@/apis";

const fetchFeeds = async (userId: number): Promise<number[]> => {
  return await customFetch(`${USER_API.GET_USER_FEEDS}/${userId}/feeds`, {
    method: "GET",
  });
};

export const useGetUserFeeds = (userId: number) => {
  return useQuery<number[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId),
    staleTime: 0,
  });
};

export const prefetchUserFeeds = async (
  userId: number,
  queryClient: QueryClient
) => {
  return queryClient.prefetchQuery<number[], Error>({
    queryKey: userKeys.feeds(userId),
    queryFn: () => fetchFeeds(userId),
  });
};
