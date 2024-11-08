interface MainContentProps {
  children: React.ReactNode;
}
export const MainContent = ({ children }: MainContentProps) => {
  return (
    <div
      className="relative overflow-y-scroll scrollbar-hide
      bg-white w-full full-viewport-min-height
        md:w-[600px] md:border-l md:border-r md:border-slate-300
        lg:w-[680px] px-4
        "
    >
      {children}
    </div>
  );
};
