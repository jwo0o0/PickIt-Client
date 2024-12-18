"use client";
import { Feed } from "../feed/Feed";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserFeeds } from "@/lib/user/hooks/useGetUserFeeds";
import userKeys from "@/lib/user/userQueries";

interface UserFeedsProps {
  userIdParam: string;
}
export const UserFeeds = ({ userIdParam }: UserFeedsProps) => {
  const { data } = useGetUserFeeds(Number(userIdParam));

  const queryClient = useQueryClient();

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
