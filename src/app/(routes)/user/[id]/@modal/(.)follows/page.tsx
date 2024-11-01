import { cookies } from "next/headers";
import { FollowModalContent } from "@/components/follow/FollowModalContent";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { prefetchFollowers } from "@/lib/follow/hooks/useGetFollowers";
import { prefetchFollowing } from "@/lib/follow/hooks/useGetFollowing";

export default async function FollowersPage({
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FollowModalContent userId={userId} />
    </HydrationBoundary>
  );
}
