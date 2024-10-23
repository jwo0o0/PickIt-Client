import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { UserProfile } from "./components/UserProfile";

export default function UserPage({ params }: { params: { id: string } }) {
  return (
    <>
      <UserProfile userIdParam={params.id} />
      <NavbarWrapper />
    </>
  );
}
