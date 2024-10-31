const commentKeys = {
  all: ["comment"] as const,
  feed: (feedId: number) => ["comment", "feed", feedId] as const,
};

export default commentKeys;
