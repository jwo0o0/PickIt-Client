import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchVotedFeed } from "@/lib/feed/hooks/useGetVotedFeed";
import VotedFeedList from "@/components/heart/VotedFeedList";
import { getAuthHeaders } from "@/lib/auth/authUtils";

export default async function PollsPage() {
  const authHeaders = await getAuthHeaders();
  const queryClient = new QueryClient();
  await prefetchVotedFeed(queryClient, authHeaders);

  return (
    <>
      <NavbarWrapper />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VotedFeedList />
      </HydrationBoundary>
    </>
  );
}
