import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./types";
import { User } from "@/lib/auth/types";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      setUser: (user: User) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "authStorage",
    }
  )
);
