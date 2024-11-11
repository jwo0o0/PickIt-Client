import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { LoginButton } from "@/components/layout/LoginButton";
import FeedList from "@/components/feed/FeedList";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchAllFeed } from "@/lib/feed/hooks/useGetAllFeed";
import { getAuthHeaders } from "@/lib/auth/authUtils";

export default async function Home() {
  const authHeaders = await getAuthHeaders();
  const queryClient = new QueryClient();
  await prefetchAllFeed(queryClient, authHeaders);

  return (
    <>
      <NavbarWrapper />
      <LoginButton />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedList />
      </HydrationBoundary>
    </>
  );
}
