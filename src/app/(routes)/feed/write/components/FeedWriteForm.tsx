"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedPayload, feedSchema } from "@/utils/feedSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { usePostFeed } from "@/lib/feed/hooks/usePostFeed";
import { PostFeedResponse } from "@/lib/feed/feedTypes";

export const FeedWriteForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FeedPayload>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      content: "",
      pollContent: "",
      polls: ["예", "아니오"],
      images: [],
    },
  });
  const {
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = form;
  const content = watch("content");
  const pollContent = watch("pollContent");

  const { mutate: postFeedMutation } = usePostFeed();

  const onSubmit = (values: FeedPayload) => {
    postFeedMutation(
      {
        feedData: {
          content: values.content,
          pollContent: values.pollContent,
          polls: values.polls,
          images: values.images,
        },
      },
      {
        onSuccess: (response: PostFeedResponse) => {
          router.push(`/feed/${response.feedId}`);
        },
        onError: () => {
          router.push("/");
          alert("피드 등록에 실패했습니다.");
        },
      }
    );
  };

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const updatedImages = [...getValues("images"), ...newFiles].slice(0, 5); // 최대 5개 제한
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleClickDeleteButton = (image: File, idx: number) => {
    const updatedImages = getValues("images").filter((_, i) => i !== idx);
    setValue("images", updatedImages, { shouldValidate: true });
    URL.revokeObjectURL(URL.createObjectURL(image));
  };

  const handleChangePollContent = (
    idx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPolls = getValues("polls").map((poll, i) =>
      i === idx ? event.target.value : poll
    );
    setValue("polls", newPolls, { shouldValidate: true });
  };

  const handleAddPoll = () => {
    if (getValues("polls").length < 5) {
      setValue("polls", [...getValues("polls"), ""], { shouldValidate: true });
    }
  };

  const handleDeletePoll = (idx: number) => {
    if (getValues("polls").length > 2) {
      const newPolls = getValues("polls").filter((_, i) => i !== idx);
      setValue("polls", newPolls);
    }
  };

  return (
    <div className="pt-24 h-full relative">
      <div></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full overflow-y-scroll scrollbar-hide pb-12"
        >
          <div className="text-slate-900 mb-4">
            <FormField
              control={form.control}
              name="polls"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col">
                      {field.value.map((poll, idx) => {
                        return (
                          <div key={idx} className="relative">
                            <Input
                              value={poll}
                              onChange={(e) => handleChangePollContent(idx, e)}
                              placeholder="선택 항목을 입력해주세요."
                              className="mb-2 font-medium placeholder:font-normal border-slate-300 focus:border-slate-700"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeletePoll(idx)}
                              className="absolute top-2 right-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 fill-slate-300"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {getValues("polls").length < 5 && (
              <Button
                type="button"
                onClick={handleAddPoll}
                className="w-full bg-white text-slate-700 border border-dashed border-slate-300 hover:bg-white"
              >
                선택 항목 추가
              </Button>
            )}
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="새로운 피드의 내용을 작성해주세요."
                    className="resize-none scrollbar-hide h-36 text-[15px] text-body2Normal
                        rounded-none border-white text-slate-900"
                    maxLength={200}
                  />
                </FormControl>
                <div
                  className="w-full text-sm text-end text-slate-500
                 border border-white border-b-slate-400 h-8
                "
                >
                  {content.length}/200자
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pollContent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="선택 후 볼 수 있는 내용을 작성해주세요."
                    className="resize-none scrollbar-hide h-36 mt-2 first-letter:mb-6 text-[15px] text-body2Normal
                        rounded-none border-white text-slate-900"
                    maxLength={200}
                  />
                </FormControl>
                <div className="w-full text-sm text-end text-slate-500 h-8">
                  {pollContent.length}/200자
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full h-36">
            <div className="text-body1Normal font-medium text-slate-900 flex items-center mb-4">
              이미지 업로드
            </div>
            <div id="images" className="flex overflow-x-scroll scrollbar-hide">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <button
                        type="button"
                        onClick={handleClickImageButton}
                        className="w-20 h-20 border border-slate-300
              flex flex-col items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 fill-slate-400"
                        >
                          <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                          <path
                            fillRule="evenodd"
                            d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <Input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <div className="text-sm text-slate-400">
                          <span className="text-indigo-500">
                            {getValues("images").length}
                          </span>
                          /5
                        </div>
                      </button>
                    </FormControl>
                  </FormItem>
                )}
              />
              {getValues("images").map((image, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-20 h-20 border border-slate-300 ml-2 relative shrink-0"
                  >
                    <Image
                      src={URL.createObjectURL(image)}
                      fill={true}
                      alt={image.name}
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleClickDeleteButton(image, idx);
                      }}
                      className="absolute top-1 right-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 fill-slate-950"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </Form>
      <div
        id="buttonContainer"
        className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-white"
      >
        <Button
          type="button"
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={!isValid}
          className={`w-full ${
            isValid ? "bg-slate-900" : "bg-slate-400"
          } hover:bg-slate-800 min-w-80`}
        >
          작성 완료
        </Button>
      </div>
    </div>
  );
};
