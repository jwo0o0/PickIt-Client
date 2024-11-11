"use client";
import { Feed } from "../feed/Feed";
import InfiniteFeedList from "../feed/InfiniteFeedList";
import { useGetVotedFeed } from "@/lib/feed/hooks/useGetVotedFeed";
import feedKeys from "@/lib/feed/feedQueries";

export default function VotedFeedList() {
  return (
    <InfiniteFeedList
      queryKey={feedKeys.voted}
      useFetchHook={useGetVotedFeed}
      FeedComponent={Feed}
    />
  );
}
