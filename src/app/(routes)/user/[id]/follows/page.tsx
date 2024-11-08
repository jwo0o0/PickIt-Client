import { cookies } from "next/headers";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { FollowContent } from "@/components/follow/FollowContent";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchFollowers } from "@/lib/follow/hooks/useGetFollowers";
import { prefetchFollowing } from "@/lib/follow/hooks/useGetFollowing";

export default async function FollowsPage({
  params,
}: {
  params: { id: string };
}) {
  const userId = Number(params.id);
  const accessToken = cookies().get("accessToken")?.value;
  const queryClient = new QueryClient();

  await prefetchFollowers(userId, queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  await prefetchFollowing(userId, queryClient, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  return (
    <>
      <ContentHeader title="" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FollowContent userId={userId} />
      </HydrationBoundary>
    </>
  );
}
