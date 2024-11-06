import { customFetch, CHAT_API } from "@/apis";
import { useState } from "react";
import { useRouter } from "next/navigation";

const fetchPostChat = async (
  partnerId: number
): Promise<{ roomId: number }> => {
  const data = await customFetch(CHAT_API.POST_CHAT(partnerId), {
    method: "POST",
  });
  if (!data || !data.roomId) {
    throw new Error("채팅방 생성 실패");
  }
  return { roomId: data.roomId };
};

export const usePostChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClickChat = async (partnerId: number) => {
    setIsLoading(true);
    try {
      const { roomId } = await fetchPostChat(partnerId);
      router.push(`/chat/${roomId}`);
    } catch {
      alert("채팅방에 접속할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleClickChat, isChatLoading: isLoading };
};
