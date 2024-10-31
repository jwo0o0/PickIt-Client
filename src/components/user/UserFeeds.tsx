"use client";
import { useRouter } from "next/navigation";
import { Feed } from "../feed/Feed";
import Dropdown from "@/components/common/Dropdown";

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
            <Dropdown
              handleClickDelete={() => {
                handleClickDelete(feed.feedId);
              }}
              hadleClickEdit={() => {}}
            />
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
