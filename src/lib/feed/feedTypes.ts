export interface PostFeedResponse {
  feedId: number;
}

interface UserType {
  userId: number;
  nickname: string;
  profileImage: string | null;
}

export interface FeedType {
  feedId: number;
  user: UserType;
  content: string;
  pollContent: string;
  commentCount: number;
  likeCount: number;
  images: string[];
  polls: string[];
  pollCount: number;
  updatedAt: string;
  result: number[];
  isVoted: boolean;
  isLiked: boolean;
}
