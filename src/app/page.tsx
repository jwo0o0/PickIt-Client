import { cookies } from "next/headers";
import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { LoginButton } from "@/components/layout/LoginButton";
import FeedList from "@/components/feed/FeedList";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchAllFeed } from "@/lib/feed/hooks/useGetAllFeed";

export default async function Home() {
  const accessToken = cookies().get("accessToken")?.value;
  const queryClient = new QueryClient();
  await prefetchAllFeed(queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

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
