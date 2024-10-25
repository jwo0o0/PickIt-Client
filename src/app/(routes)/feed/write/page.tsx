import { ContentHeader } from "@/components/common/ContentHeader";
import { FeedWriteForm } from "./components/FeedWriteForm";

export default function FeedWritePage() {
  return (
    <>
      <ContentHeader title="새로운 게시글" />
      <FeedWriteForm />
    </>
  );
}
