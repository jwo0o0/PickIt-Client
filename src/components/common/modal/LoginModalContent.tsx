import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useModalStore } from "@/store/modal/useModalStore";

export const LoginModalContent = () => {
  const close = useModalStore((state) => state.close);
  return (
    <div className="w-72 h-40 bg-white rounded-lg flex flex-col items-center justify-evenly">
      <div className="text-headline1 font-medium text-slate-900">
        로그인 하시겠습니까?
      </div>
      <div>
        <Button
          className="w-28 h-8 bg-slate-200 text-slate-700 mr-0.5 hover:bg-slate-300"
          onClick={close}
        >
          취소
        </Button>
        <Link href="/login">
          <Button className="w-28 h-8 bg-indigo-500 ml-0.5 hover:bg-indigo-600">
            로그인
          </Button>
        </Link>
      </div>
    </div>
  );
};
