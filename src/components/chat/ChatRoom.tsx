"use client";
import { useEffect, useRef } from "react";
import { ChatContentHeader } from "./ChatContentHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

import { useGetMessages } from "@/lib/chat/hooks/useGetMessages";
import { useChatSocket } from "@/lib/chat/hooks/useChatSocket";
import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const ChatRoom = ({ roomId }: { roomId: number }) => {
  const user = useStore(useAuthStore, (state) => state.user);
  const { data } = useGetMessages(roomId);
  const { messages, sendMessage } = useChatSocket(roomId, user?.id || 0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("messages", messages);
  return (
    <div className="h-full pb-16 overflow-y-scroll scrollbar-hide">
      <ChatContentHeader
        title={data?.partner.nickname || ""}
        profileImage={data?.partner.profileImage}
      />
      <div className="mt-24 flex flex-col">
        {data?.messages.map((message) => (
          <ChatMessage
            key={message.chatRoomId + message.createdAt}
            message={message}
            isUserMessage={message.userId === user?.id}
          />
        ))}
        {messages.map((message) => (
          <ChatMessage
            key={message.chatRoomId + message.createdAt}
            message={message}
            isUserMessage={message.userId === user?.id}
          />
        ))}
      </div>
      <div ref={messagesEndRef} />
      <ChatInput
        handleClickChat={(content: string) => {
          sendMessage(content);
        }}
      />
    </div>
  );
};
