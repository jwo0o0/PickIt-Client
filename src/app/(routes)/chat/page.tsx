import type { Metadata } from "next";
import { cookies } from "next/headers";
import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentTitle } from "@/components/layout/ContentTitle";
import { ChatRoomList } from "@/components/chat/ChatRoomList";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchChatRooms } from "@/lib/chat/hooks/useGetChatRooms";

export const metadata: Metadata = {
  title: "채팅 목록",
};

export default async function ChatPage() {
  const accessToken = cookies().get("accessToken")?.value;
  const queryClient = new QueryClient();
  await prefetchChatRooms(queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  return (
    <>
      <NavbarWrapper />
      <ContentTitle title="채팅 목록" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatRoomList />
      </HydrationBoundary>
    </>
  );
}
