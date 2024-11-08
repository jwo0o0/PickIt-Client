export interface OtherUserType {
  id: number;
  nickname: string;
  profileImage: string | null;
}
export interface ChatRoomListType {
  roomId: number;
  latestMessage: string;
  updatedAt: string;
  otherUser: OtherUserType;
}

export interface ChatMessageType {
  id?: number;
  chatRoomId: number;
  userId: number;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface GetMessagesResponseType {
  messages: ChatMessageType[];
  partner: OtherUserType;
}

export interface UseChatSocketReturn {
  messages: ChatMessageType[];
  sendMessage: (message: string) => void;
}
