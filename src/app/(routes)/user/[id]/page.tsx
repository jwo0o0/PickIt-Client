import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { UserProfile } from "./components/UserProfile";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import userKeys from "@/lib/user/queries";
import { UserProfileResponse } from "@/lib/user/types";
import { getUserProfile } from "@/lib/user/api";

export default async function UserPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<UserProfileResponse>({
    queryKey: userKeys.profile(Number(params.id)),
    queryFn: () => getUserProfile(Number(params.id)),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile userIdParam={params.id} />
      </HydrationBoundary>
      <NavbarWrapper />
    </>
  );
}
