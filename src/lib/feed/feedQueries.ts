const feedKeys = {
  all: ["feed"] as const,
  content: (feedId: number) => [...feedKeys.all, feedId] as const,
  liked: ["feed", "liked"] as const,
  voted: ["feed", "voted"] as const,
};

export type FeedKeysType = (typeof feedKeys)[keyof typeof feedKeys];

export default feedKeys;
