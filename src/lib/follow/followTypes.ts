export interface FollowUserResponse {
  message: string;
  followerUserId: number;
  followingUserId: number;
}

export interface FollowUserType {
  userId: number;
  nickname: string;
  profileImage: string | null;
  isFollowing: boolean;
}
