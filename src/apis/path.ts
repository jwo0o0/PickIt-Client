const AUTH_API = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  KAKAO: "/auth/kakao",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  KAKAO_SIGNUP: "/auth/signup/kakao",
};

const IMAGE_API = {
  PROFILE_UPLOAD: (userId: number) => `/image/profile?userId=${userId}`,
  FEED_UPLOAD: (feedId: number) => `/image/feeds?feedId=${feedId}`,
};

const USER_API = {
  GET_USER_PROFILE: (userId: number) => `/user/profile/${userId}`,
  GET_USER_FEEDS: (userId: number) => `/user/${userId}/feeds`,
};

const FEED_API = {
  POST_FEED: "/feeds",
  GET_FEED: (feedId: number) => `/feeds/${feedId}`,
  VOTE_FEED: (feedId: number) => `/feeds/${feedId}/vote`,
  LIKE_FEED: (feedId: number) => `/feeds/${feedId}/like`,
  DELETE_FEED: (feedId: number) => `/feeds/${feedId}`,
  GET_ALL_FEED: (page: number, limit: number) =>
    `/feeds?page=${page}&limit=${limit}`,
};

const COMMENT_API = {
  POST_COMMENT: (feedId: number) => `/comments/${feedId}`,
  DELETE_COMMENT: (commentId: number) => `/comments/${commentId}`,
  GET_COMMENTS: (feedId: number, page: number, limit: number) =>
    `/comments/${feedId}?page=${page}&limit=${limit}`,
};

export { AUTH_API, IMAGE_API, USER_API, FEED_API, COMMENT_API };
