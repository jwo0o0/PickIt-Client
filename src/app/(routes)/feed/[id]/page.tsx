import type { Metadata } from "next";
import { cookies } from "next/headers";
import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { FeedContent } from "@/components/feed/FeedContent";
import CommentList from "@/components/comment/CommentList";
import { CommentInput } from "@/components/comment/CommentInput";
import { fetchFeed } from "@/lib/feed/hooks/useGetFeed";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchFeed } from "@/lib/feed/hooks/useGetFeed";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const feed = await fetchFeed(Number(params.id));
  return {
    title: {
      absolute: `${feed.content} | ${feed.polls.join(", ")}`,
    },
    description: feed.content,
    openGraph: {
      title: `PickIt의 ${feed.user.nickname}님`,
      description: feed.content,
      url: `https://sns.jwoo.site/feed/${params.id}`,
      images:
        feed.images && feed.images.length > 0
          ? [
              {
                url: feed.images[0],
                width: 1200,
                height: 630,
                alt: `Image for feed ${params.id}`,
              },
            ]
          : [],
      type: "article",
    },
  };
}

export default async function FeedPage({ params }: { params: { id: string } }) {
  const accessToken = cookies().get("accessToken")?.value;
  const queryClient = new QueryClient();
  await prefetchFeed(Number(params.id), queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  return (
    <>
      <ContentHeader title="" />
      <div className="pt-16 full-viewport-height overflow-y-scroll scrollbar-hide">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeedContent feedId={Number(params.id)} />
        </HydrationBoundary>
        <CommentList feedId={Number(params.id)} />
        <CommentInput feedId={Number(params.id)} />
      </div>
      <NavbarWrapper />
    </>
  );
}
