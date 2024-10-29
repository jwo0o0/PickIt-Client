"use client";
import { useRouter } from "next/navigation";
import { FeedContent } from "@/components/feed/FeedContent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useStore } from "zustand";

import { useQueryClient } from "@tanstack/react-query";
import { useGetUserFeeds } from "@/lib/user/hooks/useGetUserFeeds";
import { useDeleteFeed } from "@/lib/feed/hooks/useDeleteFeed";
import userKeys from "@/lib/user/userQueries";

interface UserFeedsProps {
  userIdParam: string;
}
export const UserFeeds = ({ userIdParam }: UserFeedsProps) => {
  const router = useRouter();

  const user = useStore(useAuthStore, (state) => state.user);
  const { data } = useGetUserFeeds(Number(userIdParam));

  const { mutate: deleteFeedMutation } = useDeleteFeed();

  const queryClient = useQueryClient();
  const handleClickDelete = (feedId: number) => {
    deleteFeedMutation(
      { feedId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userKeys.feeds(Number(userIdParam)),
          });
        },
      }
    );
  };

  return (
    <>
      {data?.map((feedId) => (
        <div
          key={feedId}
          className="my-4 pb-6 border-b border-b-slate-300 relative"
        >
          {String(user?.id) === userIdParam && (
            <div className="absolute top-0 right-0 z-30">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 absolute top-0 right-0 stroke-slate-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-4 md:mr-32">
                  <DropdownMenuItem
                    onClick={() => {
                      handleClickDelete(feedId);
                    }}
                  >
                    삭제하기
                  </DropdownMenuItem>
                  <DropdownMenuItem>수정하기</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div
            onClick={() => {
              router.push(`/feed/${feedId}`);
            }}
          >
            <FeedContent feedId={feedId} />
          </div>
        </div>
      ))}
    </>
  );
};
