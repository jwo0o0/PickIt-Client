"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FollowUserProfile } from "./FollowUserProfile";

import { useGetFollowers } from "@/lib/follow/hooks/useGetFollowers";
import { useGetFollowing } from "@/lib/follow/hooks/useGetFollowing";

export const FollowContent = ({ userId }: { userId: number }) => {
  const searchParams = useSearchParams();
  const initial = searchParams.get("type") as "followers" | "following";
  const [type, setType] = useState<"followers" | "following">(
    initial || "followers"
  );

  const { data: followersData } = useGetFollowers(userId);
  const { data: followingData } = useGetFollowing(userId);
  const followers = followersData?.followers || [];
  const following = followingData?.following || [];

  return (
    <div className="pt-20 h-full overflow-y-scroll scrollbar-hide">
      <div
        className="w-full h-14 z-40 bg-white border-b border-b-slate-300 flex justify-around text-slate-900
      absolute top-20 left-0 right-0"
      >
        <div
          onClick={() => setType("followers")}
          className={`w-1/2 h-14 flex flex-col items-center justify-center absolute top-0 bottom-[-1px] left-0 hover:cursor-pointer transition-all duration-300 ease-in-out ${
            type === "followers" ? "border-b border-slate-900" : ""
          }`}
        >
          <div className="font-medium">팔로워</div>
          <div>{followers.length}</div>
        </div>
        <div
          onClick={() => setType("following")}
          className={`w-1/2 h-14 flex flex-col items-center justify-center absolute top-0 bottom-[-1px] right-0 hover:cursor-pointer transition-all duration-300 ease-in-out ${
            type === "following" ? "border-b border-slate-900" : ""
          }`}
        >
          <div className="font-medium">팔로잉</div>
          <div>{following.length}</div>
        </div>
      </div>
      <div className="mt-20">
        {
          {
            followers: followers.map((user) => (
              <FollowUserProfile key={user.userId} user={user} />
            )),
            following: following.map((user) => (
              <FollowUserProfile key={user.userId} user={user} />
            )),
          }[type]
        }
      </div>
    </div>
  );
};
