import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { LoginButton } from "@/components/layout/LoginButton";
import { LoginBanner } from "@/components/layout/LoginBanner";
import FeedList from "@/components/feed/FeedList";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchAllFeed } from "@/lib/feed/hooks/useGetAllFeed";

export default async function Home() {
  const queryClient = new QueryClient();
  await prefetchAllFeed(queryClient);

  return (
    <>
      <NavbarWrapper />
      <LoginButton />
      <LoginBanner />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedList />
      </HydrationBoundary>
    </>
  );
}
