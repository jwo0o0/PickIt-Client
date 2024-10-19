import axios from "axios";
import { axiosFormInstance } from "@/apis/axiosInstance";
import { UploadProfileImageResponse } from "./types";

export const uploadProfileImage = async (
  profileImage: File,
  userId: number
): Promise<UploadProfileImageResponse> => {
  try {
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    const response = await axiosFormInstance.post(
      `/image/profile?userId=${userId}`,
      formData
    );
    return response.data as UploadProfileImageResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "프로필 이미지 업로드에 실패했습니다."
      );
    }
    throw new Error("프로필 이미지 업로드에 실패했습니다");
  }
};
