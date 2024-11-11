import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchLikedFeed } from "@/lib/feed/hooks/useGetLikedFeed";
import LikeFeedList from "@/components/heart/LikeFeedList";
import { getAuthHeaders } from "@/lib/auth/authUtils";

export default async function LikesPage() {
  const authHeaders = await getAuthHeaders();
  const queryClient = new QueryClient();
  await prefetchLikedFeed(queryClient, authHeaders);
  return (
    <>
      <NavbarWrapper />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LikeFeedList />
      </HydrationBoundary>
    </>
  );
}
