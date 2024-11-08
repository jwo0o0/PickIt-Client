import { QueryClient, useQuery } from "@tanstack/react-query";
import userKeys from "../userQueries";
import { customFetch, USER_API } from "@/apis";
import { UserProfileResponse } from "../userTypes";

export const getUserProfile = async (
  userId: number,
  options?: RequestInit
): Promise<UserProfileResponse> => {
  return await customFetch(USER_API.GET_USER_PROFILE(userId), {
    ...options,
    method: "GET",
  });
};

export const useGetProfile = (userId: number) => {
  return useQuery<UserProfileResponse, Error>({
    queryKey: userKeys.profile(userId),
    queryFn: () => getUserProfile(userId),
  });
};

export const prefetchProfile = async (
  userId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery<UserProfileResponse, Error>({
    queryKey: userKeys.profile(userId),
    queryFn: () => getUserProfile(userId, options),
  });
};
