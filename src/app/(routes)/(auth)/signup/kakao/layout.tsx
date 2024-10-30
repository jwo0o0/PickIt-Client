import { Suspense } from "react";
export default function KakaoSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}
