import { QueryClient, useQuery } from "@tanstack/react-query";
import followKeys from "../followQueries";
import { customFetch, FOLLOW_API } from "@/apis";
import { FollowUserType } from "../followTypes";

export const getFollowers = async (userId: number, options?: RequestInit) => {
  return await customFetch(FOLLOW_API.GET_FOLLOWERS(userId), {
    ...options,
    method: "GET",
  });
};

export const useGetFollowers = (userId: number) => {
  return useQuery<{ followers: FollowUserType[] }, Error>({
    queryKey: followKeys.followers(userId),
    queryFn: () => getFollowers(userId),
  });
};

export const prefetchFollowers = async (
  userId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery<{ followers: FollowUserType[] }, Error>({
    queryKey: followKeys.followers(userId),
    queryFn: () => getFollowers(userId, options),
  });
};
