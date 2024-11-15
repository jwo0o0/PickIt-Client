import type { Metadata } from "next";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { FeedWriteForm } from "@/components/feed/FeedWriteForm";

export const metadata: Metadata = {
  title: "피드 작성",
};

export default function FeedWritePage() {
  return (
    <>
      <ContentHeader title="새로운 게시글" />
      <FeedWriteForm />
    </>
  );
}
