export interface OtherUserType {
  id: number;
  nickname: string;
  profileImage: string | null;
}
export interface ChatRoomListType {
  roomId: number;
  latestMessage: string;
  updatedAt: string;
  otherUser: OtherUserType | null;
}
