import { MainContent } from "./MainContent";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div
      className="w-screen full-viewport-height scrollbar-hide
    bg-slate-100 flex justify-center min-w-80"
    >
      <MainContent>{children}</MainContent>
    </div>
  );
};
