import { Button } from "@/components/ui/button";
import { useLoginStatus } from "@/hooks/useLoginStatus";

interface FollowButtonsProps {
  userIdParam: string;
}
export const FollowButtons = ({ userIdParam }: FollowButtonsProps) => {
  const { isLogin, isLoading } = useLoginStatus();
  return (
    <>
      {isLogin && !isLoading && (
        <div className="w-full mt-6 md:mt-8 flex">
          <Button
            className="w-6/12 h-8 mr-1 
      bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer"
          >
            팔로우
          </Button>
          <Button
            className="w-6/12 h-8 ml-1 
      text-slate-900 bg-slate-50 border border-slate-300 hover:bg-slate-100
      hover:cursor-pointer"
          >
            채팅하기
          </Button>
        </div>
      )}
    </>
  );
};
