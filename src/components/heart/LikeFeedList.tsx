"use client";
import { Feed } from "../feed/Feed";
import InfiniteFeedList from "../feed/InfiniteFeedList";
import { useGetLikedFeed } from "@/lib/feed/hooks/useGetLikedFeed";
import feedKeys from "@/lib/feed/feedQueries";

export default function LikeFeedList() {
  return (
    <InfiniteFeedList
      queryKey={feedKeys.liked}
      useFetchHook={useGetLikedFeed}
      FeedComponent={Feed}
    />
  );
}
