import { UploadProfileImageResponse } from "../user/userTypes";
import { customFormFetch, IMAGE_API } from "@/apis";
import imageCompression from "browser-image-compression";

const MAX_WIDTH = 512;
const MAX_HEIGHT = 512;
const MAX_FILE_SIZE_MB = 1;

const compressImage = async (image: File) => {
  const options = {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: Math.max(MAX_WIDTH, MAX_HEIGHT),
    useWebWorker: true,
  };
  return await imageCompression(image, options);
};

export const uploadProfileImage = async (
  profileImage: File,
  userId: number
): Promise<UploadProfileImageResponse> => {
  const compressedImage = await compressImage(profileImage);
  const formData = new FormData();
  formData.append("profileImage", compressedImage);
  return customFormFetch(IMAGE_API.PROFILE_UPLOAD(userId), {
    method: "POST",
    body: formData,
  });
};

export const uploadFeedImages = async (images: File[], feedId: number) => {
  const formData = new FormData();
  for (const image of images) {
    const compressedImage = await compressImage(image);
    formData.append("images", compressedImage);
  }
  return customFormFetch(IMAGE_API.FEED_UPLOAD(feedId), {
    method: "POST",
    body: formData,
  });
};
