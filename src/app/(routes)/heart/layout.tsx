import type { Metadata } from "next";
import { HeartTabBar } from "@/components/heart/HeartTabBar";

export const metatag: Metadata = {
  title: "투표했거나 좋아요한 피드"
};

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
