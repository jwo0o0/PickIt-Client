"use client";
import { useGetFeed } from "@/lib/feed/hooks/useGetFeed";
import { Feed } from "./Feed";

export const FeedContent = ({ feedId }: { feedId: number }) => {
  const { data, isError } = useGetFeed(feedId);

  if (isError || !data) {
    return <div>Failed to load feed.</div>;
  }
  return (
    <>
      <Feed feedId={feedId} data={data} />
    </>
  );
};
