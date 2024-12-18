import { z } from "zod";

const contentSchema = z.string().min(1).max(200, {
  message: "최대 200자까지 입력할 수 있습니다.",
});

const pollContentSchema = z.string().max(200, {
  message: "최대 200자까지 입력할 수 있습니다.",
});

const pollsSchema = z.string().min(1).array().min(2).max(5, {
  message: "선택 항목은 5개까지 추가할 수 있습니다.",
});

const imagesSchema = z
  .array(z.union([z.instanceof(File), z.string().url()]))
  .max(5);

export const feedSchema = z.object({
  content: contentSchema,
  pollContent: pollContentSchema,
  polls: pollsSchema,
  images: imagesSchema,
});

export type FeedPayload = z.infer<typeof feedSchema>;

export const feedEditSchema = z.object({
  content: contentSchema,
  pollContent: pollContentSchema,
  images: imagesSchema,
});

export type FeedEditPayload = z.infer<typeof feedEditSchema>;
