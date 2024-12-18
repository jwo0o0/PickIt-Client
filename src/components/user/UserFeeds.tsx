"use client";
import { useState } from "react";
import { Feed } from "../feed/Feed";
import Dropdown from "@/components/common/Dropdown";
import { FeedEditDrawer } from "@/components/feed/FeedEditDrawer";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useStore } from "@/store/useStore";

import { useQueryClient } from "@tanstack/react-query";
import { useGetUserFeeds } from "@/lib/user/hooks/useGetUserFeeds";
import { useDeleteFeed } from "@/lib/feed/hooks/useDeleteFeed";
import userKeys from "@/lib/user/userQueries";

interface UserFeedsProps {
  userIdParam: string;
}
export const UserFeeds = ({ userIdParam }: UserFeedsProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
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

  const handleVoteLikeSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: userKeys.feeds(Number(userIdParam)),
    });
  };

  return (
    <>
      {data?.map((feed) => (
        <div
          key={feed.feedId}
          className="my-4 pb-6 border-b border-b-slate-300 relative"
        >
          {String(user?.id) === userIdParam && (
            <>
              <Dropdown
                handleClickDelete={() => {
                  handleClickDelete(feed.feedId);
                }}
                hadleClickEdit={() => {
                  setIsOpenDrawer(true);
                }}
              />
              <FeedEditDrawer
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                data={feed}
              />
            </>
          )}
          <Feed
            feedId={feed.feedId}
            data={feed}
            handleLikeSuccess={handleVoteLikeSuccess}
            handleVoteSuccess={handleVoteLikeSuccess}
          />
        </div>
      ))}
    </>
  );
};
