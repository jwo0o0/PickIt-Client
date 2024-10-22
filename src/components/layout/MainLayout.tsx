"use client";
import styled from "styled-components";
import { MainContent } from "./MainContent";
import { SideNavbar } from "./SideNavbar";
import { LoginButton } from "./LoginButton";
import { useLoginStatus } from "@/hooks/useLoginStatus";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isLogin } = useLoginStatus();
  return (
    <MainLayoutContainer>
      {!isLogin && <LoginButton />}
      <MainContent>{children}</MainContent>
      <SideNavbar />
    </MainLayoutContainer>
  );
};

const MainLayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[100]};

  display: flex;
  justify-content: center;
`;
