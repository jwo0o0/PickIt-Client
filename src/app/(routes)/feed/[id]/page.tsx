import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { FeedContent } from "@/components/feed/FeedContent";

export default async function FeedPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ContentHeader title="" />
      <div className="pt-24">
        <FeedContent feedId={Number(params.id)} />
      </div>
      <NavbarWrapper />
    </>
  );
}
