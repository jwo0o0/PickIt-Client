import { cookies } from "next/headers";
import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { FeedContent } from "@/components/feed/FeedContent";
import CommentList from "@/components/comment/CommentList";
import { CommentInput } from "@/components/comment/CommentInput";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchFeed } from "@/lib/feed/hooks/useGetFeed";

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
      <div className="pt-24 h-screen overflow-y-scroll scrollbar-hide">
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
