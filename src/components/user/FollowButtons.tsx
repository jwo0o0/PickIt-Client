import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLoginStatus } from "@/lib/auth/hooks/useLoginStatus";
import { useFollowUser } from "@/lib/follow/hooks/useFollowUser";
import { useUnfollowUser } from "@/lib/follow/hooks/useUnfollowUser";
import { useQueryClient } from "@tanstack/react-query";
import userKeys from "@/lib/user/userQueries";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { UserProfileResponse } from "@/lib/user/userTypes";

interface FollowButtonsProps {
  userId: number;
  isFollowing: boolean;
  user: UserProfileResponse;
}
export const FollowButtons = ({
  userId,
  isFollowing,
  user,
}: FollowButtonsProps) => {
  const { isLogin, isLoading } = useLoginStatus();

  const queryClient = useQueryClient();
  const { mutate: followUserMutation } = useFollowUser();
  const { mutate: unfollowUserMutation } = useUnfollowUser();

  const handleClickFollow = async () => {
    followUserMutation(
      {
        userId,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userKeys.profile(userId),
          });
        },
      }
    );
  };

  const handleClickUnFollow = async () => {
    unfollowUserMutation(
      {
        userId,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: userKeys.profile(userId),
          });
        },
      }
    );
  };

  return (
    <>
      {isLogin && !isLoading && (
        <div className="w-full mt-6 md:mt-8 flex">
          {isFollowing ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="w-6/12 h-8 mr-1 text-slate-900 border border-slate-300
            bg-slate-50 hover:bg-slate-100"
                >
                  팔로잉
                </Button>
              </DrawerTrigger>
              <DrawerContent
                aria-describedby={undefined}
                className="mx-auto bg-white w-full md:w-[600px] lg:w-[680px]"
              >
                <div className="w-full flex flex-col items-center justify-center text-slate-900">
                  <div
                    className="w-16 h-16 mt-4 border bg-slate-200 rounded-full
          display: flex justify-center items-center overflow-hidden relative"
                  >
                    {user.profileImage ? (
                      <Image
                        src={`${user?.profileImage}`}
                        alt="프로필 이미지"
                        fill={true}
                        sizes="64px"
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        src="/images/default_user_profile.webp"
                        alt="프로필 이미지"
                        width={0}
                        height={0}
                        sizes="64px"
                        style={{
                          width: "70%",
                          height: "auto",
                        }}
                        priority={true}
                      />
                    )}
                  </div>
                  <DrawerTitle className="my-4 text-body2Normal">
                    <span className="font-semibold">{user.nickname}</span>
                    님의 팔로우를 취소하시겠어요?
                  </DrawerTitle>
                  <Button
                    onClick={handleClickUnFollow}
                    className="w-full border-t py-6 border-slate-300 bg-white rounded-none text-[15px] text-red-400 hover:bg-white"
                  >
                    팔로우 취소
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button
              onClick={handleClickFollow}
              className="w-6/12 h-8 mr-1 
      bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer"
            >
              팔로우
            </Button>
          )}
          <Button
            className="w-6/12 h-8 ml-1 
      text-slate-900 bg-slate-50 border border-slate-300 hover:bg-slate-100"
          >
            채팅하기
          </Button>
        </div>
      )}
    </>
  );
};
