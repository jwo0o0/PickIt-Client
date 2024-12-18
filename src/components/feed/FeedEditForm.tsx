"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FeedType } from "@/lib/feed/feedTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedEditPayload, feedEditSchema } from "@/utils/schema/feedSchema";
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
import { Textarea } from "../ui/textarea";
import { FeedFormImages } from "./FeedFormImages";
import { usePatchFeed } from "@/lib/feed/hooks/usePatchFeed";

interface FeedEditFormProps {
  data: FeedType;
  setIsOpen: (open: boolean) => void;
}
export const FeedEditForm = ({ data, setIsOpen }: FeedEditFormProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FeedEditPayload>({
    resolver: zodResolver(feedEditSchema),
    defaultValues: {
      content: data.content || "",
      pollContent: data.pollContent || "",
      images: data.images || [],
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

  const { mutate: patchFeedMutation } = usePatchFeed();

  const onSubmit = (values: FeedEditPayload) => {
    patchFeedMutation(
      { feedId: data.feedId, ...values },
      {
        onSuccess: () => {
          setIsOpen(false);
          router.refresh();
        },
        onError: () => {
          setIsOpen(false);
          router.refresh();
          alert("피드 수정에 실패했습니다.");
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

  const handleClickDeleteButton = (idx: number) => {
    const updatedImages = getValues("images").filter((_, i) => i !== idx);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="w-full h-full overflow-y-scroll scrollbar-hide">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full h-36">
              <div className="text-body1Normal font-medium text-slate-900 flex items-center mb-4">
                이미지 업로드
              </div>
              <div
                id="images"
                className="flex overflow-x-scroll scrollbar-hide"
              >
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
                <FeedFormImages
                  images={getValues("images")}
                  onDelete={handleClickDeleteButton}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder=""
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
            ></FormField>
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
          </form>
        </Form>
      </div>
      <Button
        type="button"
        onClick={() => form.handleSubmit(onSubmit)()}
        disabled={!isValid}
        className="w-full bg-indigo-500 hover:bg-indigo-600"
      >
        수정 완료
      </Button>
    </div>
  );
};
