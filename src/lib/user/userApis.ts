import { UploadProfileImageResponse } from "./userTypes";
import { customFormFetch, IMAGE_API } from "@/apis";

export const uploadProfileImage = async (
  profileImage: File,
  userId: number
): Promise<UploadProfileImageResponse> => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return customFormFetch(IMAGE_API.PROFILE_UPLOAD(userId), {
    method: "POST",
    body: formData,
  });
};

export const uploadFeedImages = async (images: File[], feedId: number) => {
  const formData = new FormData();
  images.forEach((image) => formData.append("images", image));
  return customFormFetch(IMAGE_API.FEED_UPLOAD(feedId), {
    method: "POST",
    body: formData,
  });
};
