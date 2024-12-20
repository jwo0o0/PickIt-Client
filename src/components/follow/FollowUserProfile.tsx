"use client";
import Link from "next/link";

import { ProfileImage } from "../common/ProfileImage";
import { Button } from "../ui/button";

import { useQueryClient } from "@tanstack/react-query";
import { useFollowUser } from "@/lib/follow/hooks/useFollowUser";
import { useUnfollowUser } from "@/lib/follow/hooks/useUnfollowUser";
import { FollowUserType } from "@/lib/follow/followTypes";
import userKeys from "@/lib/user/userQueries";
import followKeys from "@/lib/follow/followQueries";

import { useStore } from "@/store/useStore";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const FollowUserProfile = ({
  user,
  profileUserId,
}: {
  user: FollowUserType;
  profileUserId: number;
}) => {
  const currentUser = useStore(useAuthStore, (state) => state.user);
  const queryClient = useQueryClient();
  const { mutate: followUserMutation } = useFollowUser();
  const { mutate: unfollowUserMutation } = useUnfollowUser();

  // 팔로잉중이지 않은 유저를 팔로우
  const handleFollow = async () => {
    followUserMutation(
      {
        userId: user.userId,
      },
      {
        onSuccess: async () => {
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: followKeys.followers(profileUserId),
            }),
            queryClient.invalidateQueries({
              queryKey: followKeys.following(profileUserId),
            }),
            queryClient.invalidateQueries({
              queryKey: userKeys.profile(profileUserId),
            }),
          ]);
        },
      }
    );
  };

  // 이미 팔로잉인 유저를 언팔로우
  const handleUnfollow = async () => {
    unfollowUserMutation(
      {
        userId: user.userId,
      },
      {
        onSuccess: async () => {
          console.log(user.userId);
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: followKeys.followers(profileUserId),
            }),
            queryClient.invalidateQueries({
              queryKey: followKeys.following(profileUserId),
            }),
            queryClient.invalidateQueries({
              queryKey: userKeys.profile(profileUserId),
            }),
          ]);
        },
      }
    );
  };

  return (
    <div className="mx-auto w-full my-4 flex items-center text-slate-900">
      <div className="shrink-0">
        <ProfileImage imageUrl={user.profileImage} sizes="48px" width={12} />
      </div>
      <Link href={`/user/${user.userId}`} className="flex-1 mx-4 font-medium">
        {user.nickname}
      </Link>
      {!currentUser ? null : currentUser.id ===
        user.userId ? null : user.isFollowing ? (
        <Button
          size={"default"}
          onClick={handleUnfollow}
          className="h-9 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-900"
        >
          팔로잉
        </Button>
      ) : (
        <Button
          size={"default"}
          onClick={handleFollow}
          className="h-9 bg-indigo-500 hover:bg-indigo-600"
        >
          팔로우
        </Button>
      )}
    </div>
  );
};
