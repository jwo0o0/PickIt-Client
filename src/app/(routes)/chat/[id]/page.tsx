import { cookies } from "next/headers";
import { ChatRoom } from "@/components/chat/ChatRoom";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchMessages } from "@/lib/chat/hooks/useGetMessages";

export default async function ChatRoomPage({
  params,
}: {
  params: { id: string };
}) {
  const roomId = Number(params.id);
  const accessToken = cookies().get("accessToken")?.value;
  const queryClient = new QueryClient();
  await prefetchMessages(roomId, queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatRoom roomId={roomId} />
    </HydrationBoundary>
  );
}
