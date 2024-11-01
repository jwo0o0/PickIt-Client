"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { FollowButtons } from "./FollowButtons";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useGetProfile } from "@/lib/user/hooks/useGetProfile";

interface UserProfileProps {
  userIdParam: string;
}
export const UserProfile = ({ userIdParam }: UserProfileProps) => {
  const user = useStore(useAuthStore, (state) => state.user);
  const { data, isLoading } = useGetProfile(Number(userIdParam));

  return (
    <>
      {isLoading || !data ? (
        <div className="flex w-full py-4 px-2 md:py-6  border-b border-b-slate-300">
          <Skeleton className="h-12 w-12 rounded-full mr-4" />
          <div className="w-full">
            <Skeleton className="h-20 md:h-24 w-full" />
          </div>
        </div>
      ) : (
        <div className="relative w-full py-4 px-2 md:py-6 border-b border-b-slate-300">
          {String(user?.id) === userIdParam && (
            <Link href="/user/settings" scroll={false}>
              <button className="absolute top-6 right-2 md:top-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="None"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 md:size-7 stroke-slate-600 hover:stroke-slate-800 transition-colors transition-duration:300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </Link>
          )}
          <div id="userInfo" className="w-full flex">
            <div
              className="w-16 h-16 md:w-20 md:h-20 mr-4 md:mr-6 border bg-slate-200 rounded-full
          display: flex justify-center items-center overflow-hidden relative"
            >
              {data.profileImage ? (
                <Image
                  src={`${data?.profileImage}`}
                  alt="프로필 이미지"
                  fill={true}
                  sizes="64px, (min-width: 768px) 80px"
                  className="rounded-full"
                  priority={true}
                />
              ) : (
                <Image
                  src="/images/default_user_profile.webp"
                  alt="프로필 이미지"
                  width={0}
                  height={0}
                  sizes="64px, (min-width: 768px) 80px"
                  style={{
                    width: "70%",
                    height: "auto",
                  }}
                  priority={true}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="text-headline2 md:text-heading2 font-medium text-slate-900">
                {data.nickname}
              </div>
              <div
                className="text-slate-700 text-label1Normal md:text-body2Normal
          mt-2 mb-2 md:mt-3 md:mb-3
          "
              >
                <span className="font-medium mr-0.5 md:mr-1">
                  {data.followings}
                </span>
                <span className="mr-2">팔로잉</span>
                <span className="font-medium mr-0.5 md:mr-1">
                  {data.followers}
                </span>
                <span>팔로워</span>
              </div>
              <div className="text-slate-800 text-label2Normal md:text-body2Normal text-justify">
                {data.bio}
              </div>
            </div>
          </div>
          {String(user?.id) !== userIdParam && (
            <FollowButtons
              userId={Number(userIdParam)}
              isFollowing={data.isFollowing}
              user={data}
            />
          )}
        </div>
      )}
    </>
  );
};
