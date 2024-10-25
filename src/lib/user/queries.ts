const userKeys = {
  all: ["user"] as const,
  profile: (userId: number) => [...userKeys.all, userId] as const,
};

export default userKeys;
