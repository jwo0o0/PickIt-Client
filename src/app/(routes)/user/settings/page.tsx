import type { Metadata } from "next";
import { ContentHeader } from "@/components/layout/ContentHeader";
import { UserSettingsContents } from "@/components/user/UserSettingsContents";

export const metadata: Metadata = {
  title: "설정",
};
export default function UserSettingPage() {
  return (
    <>
      <ContentHeader title="설정" />
      <UserSettingsContents />
    </>
  );
}
