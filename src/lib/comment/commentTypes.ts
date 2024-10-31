export interface PostCommentResponse {
  message: string;
  commentId: number;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
}

export interface CommentListType {
  comments: CommentType[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
}
