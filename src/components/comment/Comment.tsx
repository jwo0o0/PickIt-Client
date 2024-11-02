"use client";
import Link from "next/link";
import Dropdown from "@/components/common/Dropdown";
import { ProfileImage } from "../common/ProfileImage";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useStore } from "@/store/useStore";
import { CommentType } from "@/lib/comment/commentTypes";

import { useQueryClient } from "@tanstack/react-query";
import { useDeleteComment } from "@/lib/comment/hooks/useDeleteComment";
import commentKeys from "@/lib/comment/commentQueries";
import feedKeys from "@/lib/feed/feedQueries";
import timeAgo from "@/utils/timeAgo";

interface CommentProps {
  data: CommentType;
  feedId: number;
}
export const Comment = ({ data, feedId }: CommentProps) => {
  const user = useStore(useAuthStore, (state) => state.user);

  const { mutate: deleteCommentMutation } = useDeleteComment();

  const queryClient = useQueryClient();
  const handleClickDelete = () => {
    deleteCommentMutation(
      { commentId: data.id },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: commentKeys.feed(feedId),
          });
          await queryClient.refetchQueries({
            queryKey: feedKeys.content(feedId),
          });
        },
      }
    );
  };

  return (
    <div className="relative w-full my-4 pb-4 border-b border-slate-300 flex">
      {String(user?.id) === String(data.user.id) && (
        <Dropdown
          handleClickDelete={handleClickDelete}
          hadleClickEdit={() => {}}
        />
      )}
      <div id="profileImage" className="mr-4 shrink-0">
        <ProfileImage imageUrl={data.user.profileImage} sizes="40px" />
      </div>
      <div className="flex-1">
        <div className="text-body2Normal md:text-body1Normal">
          <Link
            href={`/user/${data.user.id}`}
            className="font-semibold text-slate-900 mr-2"
          >
            {data.user.nickname}
          </Link>
          <span suppressHydrationWarning className="text-slate-400 font-normal">
            {timeAgo(data.createdAt)}
          </span>
        </div>
        <div className="mt-2 text-body2Normal">{data.content}</div>
      </div>
    </div>
  );
};
