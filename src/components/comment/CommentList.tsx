import { Comments } from "./Comments";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchComments } from "@/lib/comment/hooks/useGetComment";

export default async function CommentList({ feedId }: { feedId: number }) {
  const queryClient = new QueryClient();
  await prefetchComments(feedId, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments feedId={feedId} />
    </HydrationBoundary>
  );
}
