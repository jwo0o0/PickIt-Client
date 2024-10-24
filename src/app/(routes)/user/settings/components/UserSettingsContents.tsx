"use client";
import Link from "next/link";
import { useLogout } from "@/lib/auth/hooks/useLogout";

export const UserSettingsContents = () => {
  const { mutate: logout } = useLogout();

  return (
    <div className="mt-28">
      <button
        className="w-full flex justify-between px-4 py-2
        bg-white hover:bg-white text-slate-900 text-md font-medium"
      >
        <Link href="/user/edit">프로필 수정</Link>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width={20}
            className="stroke-slate-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </button>
      <button
        onClick={() => {
          logout();
        }}
        className="
        absolute bottom-12 right-4 left-4
        flex justify-between px-4 py-2
        bg-white hover:bg-white text-red-400 text-md font-medium"
      >
        로그아웃
      </button>
    </div>
  );
};
