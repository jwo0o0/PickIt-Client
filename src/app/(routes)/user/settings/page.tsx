import { ContentHeader } from "@/components/layout/ContentHeader";
import { UserSettingsContents } from "@/components/user/UserSettingsContents";

export default function UserSettingPage() {
  return (
    <>
      <ContentHeader title="설정" />
      <UserSettingsContents />
    </>
  );
}
