import { QueryClient, useQuery } from "@tanstack/react-query";
import followKeys from "../followQueries";
import { customFetch, FOLLOW_API } from "@/apis";
import { FollowUserType } from "../followTypes";

export const getFollowing = async (userId: number, options?: RequestInit) => {
  return await customFetch(FOLLOW_API.GET_FOLLOWING(userId), {
    ...options,
    method: "GET",
  });
};

export const useGetFollowing = (userId: number) => {
  return useQuery<{ following: FollowUserType[] }, Error>({
    queryKey: followKeys.following(userId),
    queryFn: () => getFollowing(userId),
  });
};

export const prefetchFollowing = async (
  userId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery<{ following: FollowUserType[] }, Error>({
    queryKey: followKeys.following(userId),
    queryFn: () => getFollowing(userId, options),
  });
};
