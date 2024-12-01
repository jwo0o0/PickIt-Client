"use client";
import { Feed } from "../feed/Feed";
import Dropdown from "@/components/common/Dropdown";

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
            <Dropdown
              handleClickDelete={() => {
                handleClickDelete(feed.feedId);
              }}
              hadleClickEdit={() => {}}
            />
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
