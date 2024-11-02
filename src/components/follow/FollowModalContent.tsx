"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { FollowUserProfile } from "./FollowUserProfile";

import { useGetFollowers } from "@/lib/follow/hooks/useGetFollowers";
import { useGetFollowing } from "@/lib/follow/hooks/useGetFollowing";

export const FollowModalContent = ({ userId }: { userId: number }) => {
  const searchParams = useSearchParams();
  const initial = searchParams.get("type") as "followers" | "following";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"followers" | "following">(
    initial || "followers"
  );

  const { data: followersData } = useGetFollowers(userId);
  const { data: followingData } = useGetFollowing(userId);
  const followers = followersData?.followers || [];
  const following = followingData?.following || [];

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            router.back();
          }
        }}
      >
        <DrawerContent
          aria-describedby={undefined}
          className="mx-auto w-full md:w-[600px] lg:w-[680px] h-[85vh] bg-white z-50"
        >
          <DrawerTitle className="hidden"></DrawerTitle>
          <div className="shrink-0 w-full h-14 mt-2 border-b border-b-slate-300 flex justify-around text-slate-900 relative">
            <div
              onClick={() => setType("followers")}
              className={`w-1/2 h-14 flex flex-col items-center absolute top-0 bottom-[-1px] left-0 hover:cursor-pointer transition-all duration-300 ease-in-out ${
                type === "followers" ? "border-b border-slate-900" : ""
              }`}
            >
              <div className="font-medium">팔로워</div>
              <div>{followers.length}</div>
            </div>
            <div
              onClick={() => setType("following")}
              className={`w-1/2 h-14 flex flex-col items-center absolute top-0 bottom-[-1px] right-0 hover:cursor-pointer transition-all duration-300 ease-in-out ${
                type === "following" ? "border-b border-slate-900" : ""
              }`}
            >
              <div className="font-medium">팔로잉</div>
              <div>{following.length}</div>
            </div>
          </div>
          <div className="overflow-y-scroll scrollbar-hide">
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
        </DrawerContent>
      </Drawer>
    </>
  );
};
