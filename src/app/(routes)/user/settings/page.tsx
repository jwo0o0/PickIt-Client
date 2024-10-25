import { ContentHeader } from "@/components/common/ContentHeader";
import { UserSettingsContents } from "./components/UserSettingsContents";

export default function UserSettingPage() {
  return (
    <>
      <ContentHeader title="설정" />
      <UserSettingsContents />
    </>
  );
}
