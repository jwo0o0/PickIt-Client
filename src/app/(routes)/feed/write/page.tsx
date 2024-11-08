import { ContentHeader } from "@/components/layout/ContentHeader";
import { FeedWriteForm } from "@/components/feed/FeedWriteForm";

export default function FeedWritePage() {
  return (
    <>
      <ContentHeader title="새로운 게시글" />
      <FeedWriteForm />
    </>
  );
}
