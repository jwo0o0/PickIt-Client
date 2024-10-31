"use client";
import { useRouter } from "next/navigation";
import { Feed } from "../feed/Feed";
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
      {data?.map((feed) => (
        <div
          key={feed.feedId}
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
                <DropdownMenuContent className="mr-4 md:mr-32 text-slate-900">
                  <DropdownMenuItem
                    onClick={() => {
                      handleClickDelete(feed.feedId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 stroke-slate-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    삭제하기
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 stroke-slate-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                    수정하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div
            onClick={() => {
              router.push(`/feed/${feed.feedId}`);
            }}
          >
            <Feed feedId={feed.feedId} data={feed} />
          </div>
        </div>
      ))}
    </>
  );
};
