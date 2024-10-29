import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/common/ContentHeader";
import { FeedContent } from "@/components/feed/FeedContent";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchFeed } from "@/lib/feed/hooks/useGetFeed";

export default async function FeedPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await prefetchFeed(Number(params.id), queryClient);

  return (
    <>
      <ContentHeader title="" />
      <div className="pt-24">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeedContent feedId={Number(params.id)} />
        </HydrationBoundary>
      </div>
      <NavbarWrapper />
    </>
  );
}
