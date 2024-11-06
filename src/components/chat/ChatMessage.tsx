"use client";
import { memo, useState, useEffect } from "react";
import { ChatMessageType } from "@/lib/chat/chatTypes";
import formatChatTimestamp from "@/utils/formatTimestamp";

export const ChatMessage = memo(
  ({
    message,
    isUserMessage,
  }: {
    message: ChatMessageType;
    isUserMessage: boolean;
  }) => {
    const [isRendered, setIsRendered] = useState(false);
    useEffect(() => {
      setIsRendered(true);
    }, []);
    return (
      <div
        className={`my-3 ${
          isUserMessage ? "place-self-end" : "place-self-start"
        }`}
        style={{ opacity: isRendered ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          className={`max-w-64 md:max-w-80 px-4 py-3 shadow-md whitespace-pre-line text-body2Normal ${
            isUserMessage
              ? "bg-indigo-500 text-white rounded-l-lg rounded-tr-lg"
              : "bg-slate-200 text-slate-900 rounded-r-lg rounded-tl-lg"
          }`}
        >
          {message.content}
        </div>
        <div
          className={`mt-1 text-slate-500 text-sm ${
            isUserMessage ? "text-right" : "text-left"
          }`}
        >
          {formatChatTimestamp(message.createdAt)}
        </div>
      </div>
    );
  }
);
