const followKeys = {
  all: ["follow"] as const,
  following: (userId: number) =>
    [...followKeys.all, "following", userId] as const,
  followers: (userId: number) =>
    [...followKeys.all, "followers", userId] as const,
};

export default followKeys;
