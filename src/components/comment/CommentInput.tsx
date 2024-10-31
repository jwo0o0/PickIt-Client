"use client";
import { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { usePostComment } from "@/lib/comment/hooks/usePostComment";

import { useQueryClient } from "@tanstack/react-query";
import commentKeys from "@/lib/comment/hooks/commentQueries";

export const CommentInput = ({ feedId }: { feedId: number }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    target.style.height = "40px"; // 초기화
    target.style.height = `${target.scrollHeight}px`; // 텍스트에 맞게 높이 조정
  };

  const queryClient = useQueryClient();
  const { mutate: postCommentMutation } = usePostComment();
  const handleClickPost = async () => {
    const content = textAreaRef.current?.value;
    if (!content) return;

    postCommentMutation(
      { feedId, content },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: commentKeys.feed(feedId),
          });
        },
      }
    );
    textAreaRef.current!.value = "";
    textAreaRef.current!.style.height = "40px";
  };

  return (
    <div
      className="w-full px-4 pt-4 md:py-6 absolute bottom-[68px] md:bottom-0 left-0 right-0
    bg-white flex bg-opacity-85"
    >
      <Textarea
        className="bg-slate-200 min-h-[40px] resize-none srcollbar-hide"
        placeholder="댓글을 남겨주세요."
        ref={textAreaRef}
        onInput={handleInput}
        style={{ height: "40px" }}
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
