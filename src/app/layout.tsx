import type { Metadata } from "next";
import "./global.css";
import Providers from "@/utils/query/provider";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: {
    default: "PickIt",
    template: "PickIt | %s",
  },
  description: "질문과 고르기로 소통하는 SNS 서비스",
  openGraph: {
    title: "PickIt",
    type: "website",
    url: "https://sns.jwoo.site",
    siteName: "PickIt",
    images: [
      {
        url: "https://sns.jwoo.site/images/og_image.png",
        width: 800,
        height: 400,
        alt: "PickIt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
        />
      </head>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
