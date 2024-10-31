"use client";
import { useGetFeed } from "@/lib/feed/hooks/useGetFeed";
import { Feed } from "./Feed";

export const FeedContent = ({ feedId }: { feedId: number }) => {
  const { data } = useGetFeed(feedId);

  return <Feed feedId={feedId} data={data} />;
};
