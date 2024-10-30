const AUTH_API = {
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  KAKAO: "/auth/kakao",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  KAKAO_SIGNUP: "/auth/signup/kakao",
};

const IMAGE_API = {
  PROFILE_UPLOAD: "/image/profile?",
  FEED_UPLOAD: "/image/feeds?",
};

const USER_API = {
  GET_USER_PROFILE: "/user/profile",
  GET_USER_FEEDS: "/user",
};

const FEED_API = {
  POST_FEED: "/feeds",
  GET_FEED: "/feeds",
  VOTE_FEED: "/feeds",
  LIKE_FEED: "/feeds",
  DELETE_FEED: "/feeds",
};

export { AUTH_API, IMAGE_API, USER_API, FEED_API };
