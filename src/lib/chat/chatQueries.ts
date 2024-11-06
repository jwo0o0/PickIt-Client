const chatKeys = {
  all: ["chat"] as const,
  rooms: ["chat", "rooms"] as const,
  messages: (roomId: number) => ["chat", "room", roomId] as const,
};

export default chatKeys;
