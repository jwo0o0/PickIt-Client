import { ProfileImage } from "../common/ProfileImage";
import { Button } from "@/components/ui/button";
import { useLoginStatus } from "@/lib/auth/hooks/useLoginStatus";
import { useFollowUser } from "@/lib/follow/hooks/useFollowUser";
import { useUnfollowUser } from "@/lib/follow/hooks/useUnfollowUser";
import { useQueryClient } from "@tanstack/react-query";
import userKeys from "@/lib/user/userQueries";
import { usePostChat } from "@/lib/chat/hooks/usePostChat";

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
  const { handleClickChat, isChatLoading } = usePostChat();

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
                  <div className="mt-4">
                    <ProfileImage
                      imageUrl={user.profileImage}
                      width={16}
                      sizes="64px"
                    />
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
            onClick={() => {
              if (!isChatLoading) {
                handleClickChat(userId);
              }
            }}
            className={`w-6/12 h-8 ml-1 relative text-slate-900 bg-slate-50 border border-slate-300 hover:bg-slate-100
              ${isChatLoading ? "cursor-not-allowed" : "hover:cursor-pointer"}`}
          >
            채팅하기
            {isChatLoading && (
              <div className="absolute inset-0 bg-black/30 rounded-sm flex items-center justify-center">
                <div role="status" className="flex justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-800 fill-slate-400"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            )}
          </Button>
        </div>
      )}
    </>
  );
};
