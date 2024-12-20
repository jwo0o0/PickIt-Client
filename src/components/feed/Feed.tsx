"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileImage } from "@/components/common/ProfileImage";
import { LoginModalContent } from "../common/modal";
import Dropdown from "@/components/common/Dropdown";
import { FeedEditDrawer } from "@/components/feed/FeedEditDrawer";

import { FeedType } from "@/lib/feed/feedTypes";
import { useQueryClient } from "@tanstack/react-query";
import feedKeys from "@/lib/feed/feedQueries";
import { useVoteFeed } from "@/lib/feed/hooks/useVoteFeed";
import { useLikeFeed } from "@/lib/feed/hooks/useLikeFeed";
import { useDeleteFeed } from "@/lib/feed/hooks/useDeleteFeed";
import { useLoginStatus } from "@/lib/auth/hooks/useLoginStatus";
import { useModalStore } from "@/store/modal/useModalStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useStore } from "@/store/useStore";
import timeAgo from "@/utils/format/timeAgo";
import getImageName from "@/utils/format/getImageName";

export interface FeedProps {
  feedId: number;
  data: FeedType;
  handleVoteSuccess?: () => Promise<void>;
  handleLikeSuccess?: () => Promise<void>;
}
export const Feed: FC<FeedProps> = ({
  feedId,
  data,
  handleVoteSuccess,
  handleLikeSuccess,
}: FeedProps) => {
  const router = useRouter();

  const user = useStore(useAuthStore, (state) => state.user);
  const { isLogin, isLoading } = useLoginStatus();
  const openModal = useModalStore((state) => state.open);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const sum = data?.result.reduce((acc, cur) => acc + cur, 0) ?? 0;
  const max = Math.max(...(data?.result ?? []));
  const percents =
    data?.result.map((result) => Math.round((result / sum) * 1000) / 10) ?? [];

  const { mutate: voteFeedMutation } = useVoteFeed();

  const handleClickVote = async (item: number) => {
    if (!isLogin && !isLoading) {
      openModal(<LoginModalContent />);
    } else {
      voteFeedMutation(
        { feedId, pollItem: item },
        {
          onSuccess: async () => {
            if (handleVoteSuccess) {
              await handleVoteSuccess();
            } else {
              await queryClient.invalidateQueries({
                queryKey: feedKeys.content(feedId),
              });
            }
          },
        }
      );
    }
  };

  const { mutate: likeFeedMutation } = useLikeFeed();

  const handleClickLike = async () => {
    if (!isLogin && !isLoading) {
      openModal(<LoginModalContent />);
    } else {
      likeFeedMutation(
        { feedId },
        {
          onSuccess: async () => {
            if (handleLikeSuccess) {
              await handleLikeSuccess();
            } else {
              await queryClient.invalidateQueries({
                queryKey: feedKeys.content(feedId),
              });
            }
          },
        }
      );
    }
  };

  const { mutate: deleteFeedMutation } = useDeleteFeed();

  const handleClickDelete = () => {
    deleteFeedMutation(
      {
        feedId,
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
      }
    );
  };

  return (
    <>
      <div
        onClick={() => {
          router.push(`/feed/${feedId}`);
        }}
        className="relative flex h-fit"
      >
        <div id="profileImage" className="shrink-0 mr-4 relative">
          <ProfileImage imageUrl={data?.user.profileImage} sizes="40px" />
        </div>
        <div className="w-full" style={{ maxWidth: "calc(100% - 60px)" }}>
          <div className="text-body2Normal md:text-body1Normal">
            <Link
              href={`/user/${data?.user.userId}`}
              className="font-semibold text-slate-900 mr-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {data?.user.nickname}
            </Link>
            <span
              className="text-slate-400 font-normal"
              suppressHydrationWarning
            >
              {data?.updatedAt ? timeAgo(data.updatedAt) : "N/A"}
            </span>
          </div>
          <div className="mt-2 overflow-x-scroll scrollbar-hide">
            <div className="flex space-x-2">
              {data?.images?.map((image, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-48 h-48 border border-slate-300 bg-slate-200 relative shrink-0"
                  >
                    <Image
                      src={image}
                      alt={getImageName(image)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-2 md:my-4 text-body2Normal">{data?.content}</div>
          {data?.isVoted ? (
            <div id="pollResults">
              {data.polls.map((option, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full my-2 h-9 rounded-lg relative"
                  >
                    <div className="absolute w-full h-9 border border-1 border-slate-300 rounded-lg" />
                    <div
                      className={`absolute left-0 top-0 bottom-0 rounded-lg ${
                        data.result[idx] === max
                          ? "bg-indigo-500"
                          : "bg-slate-300"
                      }`}
                      style={{
                        width: `${percents[idx]}%`,
                      }}
                    />
                    <div
                      className={`absolute h-9 text-body2Normal leading-9 pl-3 ${
                        data.result[idx] === max ? "font-medium" : "font-normal"
                      } text-slate-900`}
                    >
                      {option}
                    </div>
                    <div className="absolute h-0 text-body2Normal leading-9 right-0 pr-3 text-slate-700">
                      {percents[idx]}%
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div id="pollOptions">
              {data?.polls.map((option, idx) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickVote(idx);
                    }}
                    key={idx}
                    className="my-2 h-9 border border-indigo-500 rounded-lg text-center text-body2Normal leading-9 text-indigo-500 font-semibold
              hover:bg-indigo-50 cursor-pointer"
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          )}
          {data?.isVoted && (
            <div className="my-2 md:my-4 text-body2Normal">
              {data?.pollContent}
            </div>
          )}
          <div className="flex items-center text-slate-600">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClickLike();
              }}
              className="mr-1"
            >
              {data?.isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 fill-red-400 transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="transition-all duration-300 ease-in-out size-5 stroke-slate-600 hover:stroke-red-400 hover:scale-105"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </button>
            <div className="mr-2 text-sm">{data?.likeCount}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 stroke-slate-600 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            <div className="text-sm">{data?.commentCount}</div>
          </div>
        </div>
        {user?.id === data?.user.userId && (
          <Dropdown
            handleClickDelete={handleClickDelete}
            hadleClickEdit={() => {
              setIsOpenDrawer(true);
            }}
          />
        )}
      </div>
      <FeedEditDrawer
        isOpen={isOpenDrawer}
        setIsOpen={setIsOpenDrawer}
        data={data}
      />
    </>
  );
};
