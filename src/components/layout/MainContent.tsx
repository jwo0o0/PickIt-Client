import styled from "styled-components";
import { BottomNavbar } from "./Navbar/BottomNavbar";
interface MainContentProps {
  children: React.ReactNode;
}
export const MainContent = ({ children }: MainContentProps) => {
  return (
    <div
      className="relative h-full overflow-y-scroll bg-white w-full 
                    md:w-[600px] 
                    md:border-l 
                    md:border-r md:border-slate-200"
    >
      <Feeds />
      {children}
      <BottomNavbar />
    </div>
  );
};

const Feeds = styled.div`
  width: 100%;
  height: 1000px;
`;
