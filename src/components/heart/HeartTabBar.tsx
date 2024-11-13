"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const HeartTabBar = () => {
  const pathname = usePathname();
  const type = pathname.split("/").filter(Boolean).pop();
  return (
    <div
      className="w-full h-20 absolute top-0 left-0 right-0
  border-b border-b-slate-300 flex text-slate-900"
    >
      <Link
        href="/heart/polls"
        className={`w-1/2 absolute left-0 top-0 bottom-[-1px] transition-all duration-300 ease-in-out 
            text-center leading-[80px] ${
              type === "polls" ? "font-medium border-b border-b-slate-900 " : ""
            }`}
      >
        투표한 피드
      </Link>
      <Link
        href="/heart/likes"
        className={`w-1/2 absolute right-0 top-0 bottom-[-1px] transition-all duration-300 ease-in-out
            text-center leading-[80px] ${
              type === "likes" ? "font-medium border-b border-b-slate-900" : ""
            }`}
      >
        좋아요한 피드
      </Link>
    </div>
  );
};
