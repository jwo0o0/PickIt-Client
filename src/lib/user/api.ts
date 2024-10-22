import { UploadProfileImageResponse } from "./types";
import { customFormFetch, IMAGE_API } from "@/apis";

export const uploadProfileImage = async (
  profileImage: File,
  userId: number
): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return customFormFetch(`${IMAGE_API.PROFILE_UPLOAD}userId=${userId}`, {
    method: "POST",
    body: formData,
  });
};
