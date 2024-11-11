"use client";
import { Feed } from "./Feed";
import InfiniteFeedList from "./InfiniteFeedList";
import { useGetAllFeed } from "@/lib/feed/hooks/useGetAllFeed";
import feedKeys from "@/lib/feed/feedQueries";

export default function FeedList() {
  return (
    <InfiniteFeedList
      queryKey={feedKeys.all}
      useFetchHook={useGetAllFeed}
      FeedComponent={Feed}
    />
  );
}
