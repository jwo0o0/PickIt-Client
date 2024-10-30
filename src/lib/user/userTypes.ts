export interface UploadProfileImageResponse {
  message: string;
  profileImage: string;
}

export interface UserProfileResponse {
  nickname: string;
  bio: string;
  profileImage: string;
  followers: number;
  followings: number;
}
