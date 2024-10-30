"use client";
import { useGetFeed } from "@/lib/feed/hooks/useGetFeed";
import { Feed } from "./Feed";
import { Skeleton } from "../ui/skeleton";

export const FeedContent = ({ feedId }: { feedId: number }) => {
  const { data, isLoading } = useGetFeed(feedId);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full mt-8">
          <Skeleton className="h-12 w-12 rounded-full mr-4" />
          <div className="w-full">
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-8 w-full mb-4" />
          </div>
        </div>
      ) : (
        <Feed feedId={feedId} data={data} />
      )}
    </>
  );
};
