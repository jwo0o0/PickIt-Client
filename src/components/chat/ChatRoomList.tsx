"use client";
import Link from "next/link";
import { useGetChatRooms } from "@/lib/chat/hooks/useGetChatRooms";
import { ProfileImage } from "../common/ProfileImage";
import timeAgo from "@/utils/timeAgo";

export const ChatRoomList = () => {
  const { data } = useGetChatRooms();
  console.log(data);
  return (
    <div className="w-full h-full pt-16 overflow-y-scroll scrollbar-hide">
      {data?.map((room) => (
        <Link href={`/chat/${room.roomId}`}>
          <div
            key={room.roomId}
            className="w-full h-20 bg-slate-100 rounded-md mt-4 px-4 flex items-center shadow-sm
          hover:cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
          >
            <div className="h-12 shrink-0">
              <ProfileImage
                imageUrl={room.otherUser?.profileImage}
                width={12}
                sizes="48px"
              />
            </div>
            <div className="min-w-0 h-12 flex-1 px-4 flex flex-col justify-between">
              <div className="w-full flex justify-between">
                <div className="font-medium text-slate-900">
                  {room.otherUser?.nickname}
                </div>
                <div className="min-w-0 text-slate-600">
                  {timeAgo(room.updatedAt)}
                </div>
              </div>
              <div className="min-w-0 text-label1Normal text-slate-600 truncate">
                {room.latestMessage}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
