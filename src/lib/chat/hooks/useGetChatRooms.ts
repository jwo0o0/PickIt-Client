import { QueryClient, useQuery } from "@tanstack/react-query";
import { customFetch, CHAT_API } from "@/apis";
import { ChatRoomListType } from "../chatTypes";
import chatKeys from "../chatQueries";

export const getChatRooms = async (
  options?: RequestInit
): Promise<ChatRoomListType[]> => {
  return await customFetch(CHAT_API.GET_CHATROOMS, {
    ...options,
    method: "GET",
  });
};

export const useGetChatRooms = () => {
  return useQuery<ChatRoomListType[], Error>({
    queryKey: chatKeys.rooms,
    queryFn: getChatRooms,
  });
};

export const prefetchChatRooms = async (
  queryClient: QueryClient,
  options?: RequestInit
) => {
  await queryClient.prefetchQuery<ChatRoomListType[], Error>({
    queryKey: chatKeys.rooms,
    queryFn: () => getChatRooms(options),
  });
};
