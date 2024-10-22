import NavbarWrapper from "@/components/layout/Navbar/NavbarWrapper";
import { LoginButton } from "@/components/layout/LoginButton";
import { LoginBanner } from "@/components/layout/LoginBanner";

export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <LoginButton />
      <LoginBanner />
    </>
  );
}
