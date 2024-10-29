"use client";
import { useRouter } from "next/navigation";

interface ContentHeaderProps {
  title: string;
  button?: string;
  onClickButton?: () => void;
}
export const ContentHeader = ({
  title,
  button,
  onClickButton,
}: ContentHeaderProps) => {
  const router = useRouter();
  return (
    <div
      className="z-50 h-20 bg-white border-b border-b-slate-300 absolute top-0 right-0 left-0
        flex items-center py-2 px-4
    "
    >
      <button
        onClick={() => {
          router.back();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 stroke-slate-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="ml-4 text-slate-900 font-semibold">{title}</div>
      <button
        className="absolute right-4 p-2 font-semibold text-slate-900"
        onClick={onClickButton}
      >
        {button}
      </button>
    </div>
  );
};
