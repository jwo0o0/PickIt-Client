import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { UserProfile } from "@/components/user/UserProfile";
import { UserFeeds } from "@/components/user/UserFeeds";

export default async function UserPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ContentHeader title="" />
      <div className="pt-20 pb-10 h-full overflow-y-scroll scrollbar-hide">
        <UserProfile userIdParam={params.id} />
        <UserFeeds userIdParam={params.id} />
        <NavbarWrapper />
      </div>
    </>
  );
}
