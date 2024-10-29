const feedKeys = {
  all: ["feed"] as const,
  content: (feedId: number) => [...feedKeys.all, feedId] as const,
};

export default feedKeys;
