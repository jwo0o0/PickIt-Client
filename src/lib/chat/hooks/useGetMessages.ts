import { QueryClient, useQuery } from "@tanstack/react-query";
import { customFetch, CHAT_API } from "@/apis";
import chatKeys from "../chatQueries";
import { GetMessagesResponseType } from "../chatTypes";

export const getMessages = async (
  roomId: number,
  options?: RequestInit
): Promise<GetMessagesResponseType> => {
  return await customFetch(CHAT_API.GET_MESSAGES(roomId), {
    ...options,
    method: "GET",
  });
};

export const useGetMessages = (roomId: number) => {
  return useQuery<GetMessagesResponseType, Error>({
    queryKey: chatKeys.messages(roomId),
    queryFn: () => getMessages(roomId),
  });
};

export const prefetchMessages = async (
  roomId: number,
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery<GetMessagesResponseType, Error>({
    queryKey: chatKeys.messages(roomId),
    queryFn: () => getMessages(roomId, options),
  });
};
