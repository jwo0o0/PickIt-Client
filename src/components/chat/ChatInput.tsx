import { useRef } from "react";
import { Textarea } from "../ui/textarea";

export const ChatInput = ({
  handleClickChat,
}: {
  handleClickChat: (content: string) => void;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    target.style.height = "40px";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="w-full absolute left-0 right-0 bottom-0 px-4 py-3 flex items-end bg-white bg-opacity-85">
      <button className="shrink-0 mr-3 h-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 stroke-slate-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
          />
        </svg>
      </button>
      <Textarea
        ref={textAreaRef}
        onInput={handleInput}
        style={{ height: "40px" }}
        placeholder="메시지 보내기"
        maxLength={200}
        className="w-full h-10 pb-3 min-h-[40px] resize-none srcollbar-hide border border-none bg-slate-200 rounded-lg"
      />
      <button
        onClick={() => {
          if (textAreaRef.current?.value) {
            handleClickChat(textAreaRef.current.value);
            textAreaRef.current.value = "";
          }
        }}
        className="w-10 h-10 shrink-0 ml-3 bg-indigo-600 flex items-center justify-center rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="ml-1 mb-1 size-6 stroke-slate-100 transition-all duration-300 ease-in-out hover:scale-105 hover:-rotate-45"
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
