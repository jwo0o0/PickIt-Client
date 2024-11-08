import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatMessageType } from "../chatTypes";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_API_URL
    : process.env.NEXT_PUBLIC_DEV_API_URL;

export const useChatSocket = (roomId: number, userId: number) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) return;
    const socket = io(url + "/room", {
      path: "/socket.io",
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom", { roomId });
    });
    socket.on("receiveMessage", async (message: ChatMessageType) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [roomId]);

  const sendMessage = (content: string) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        chatRoomId: roomId,
        userId,
        content,
      });
    }
  };

  return {
    messages,
    sendMessage,
  };
};
