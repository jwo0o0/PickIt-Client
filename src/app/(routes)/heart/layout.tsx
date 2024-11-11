import { HeartTabBar } from "@/components/heart/HeartTabBar";

export default function HeartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="mt-24">{children}</div>
      <HeartTabBar />
    </>
  );
}
