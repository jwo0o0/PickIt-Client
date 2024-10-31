"use client";
import { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { usePostComment } from "@/lib/comment/hooks/usePostComment";

export const CommentInput = ({ feedId }: { feedId: number }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    target.style.height = "auto"; // 초기화
    target.style.height = `${target.scrollHeight}px`; // 텍스트에 맞게 높이 조정
  };

  const { mutate: postCommentMutation } = usePostComment();
  const handleClickPost = async () => {
    const content = textAreaRef.current?.value;
    if (!content) return;

    postCommentMutation({ feedId, content });
    textAreaRef.current!.value = "";
    textAreaRef.current!.style.height = "60px";
  };

  return (
    <div
      className="w-full px-4 py-4 md:py-6 absolute bottom-[68px] md:bottom-0 left-0 right-0
    bg-white flex"
    >
      <Textarea
        className="bg-slate-200 min-h-[60px] resize-none"
        placeholder="댓글을 남겨주세요."
        ref={textAreaRef}
        onInput={handleInput}
      />
      <button
        onClick={handleClickPost}
        className="w-12 ml-4 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-6 stroke-indigo-500 transition-all duration-300 ease-in-out hover:stroke-indigo-600 hover:scale-105 hover:-rotate-45"
          transform="rotate(-45)"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};
