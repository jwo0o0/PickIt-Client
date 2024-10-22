"use client";
import { useLoginStatus } from "@/hooks/useLoginStatus";

import { MainContent } from "./MainContent";
import { SideNavbar } from "./Navbar/SideNavbar";
import { LoginButton } from "@/components/layout/LoginButton";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isLogin, isLoading } = useLoginStatus();
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center">
      {!isLoading && !isLogin && <LoginButton />}
      <MainContent>{children}</MainContent>
      <SideNavbar />
    </div>
  );
};
