import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { UserProfile } from "@/components/user/UserProfile";
import { UserFeeds } from "@/components/user/UserFeeds";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchProfile } from "@/lib/user/hooks/useGetProfile";
import { prefetchUserFeeds } from "@/lib/user/hooks/useGetUserFeeds";

export default async function UserPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await prefetchProfile(Number(params.id), queryClient);
  await prefetchUserFeeds(Number(params.id), queryClient);

  return (
    <>
      <ContentHeader title="" />
      <div className="pt-20 pb-10 h-full overflow-y-scroll scrollbar-hide">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserProfile userIdParam={params.id} />
        </HydrationBoundary>
        <UserFeeds userIdParam={params.id} />
        <NavbarWrapper />
      </div>
    </>
  );
}
