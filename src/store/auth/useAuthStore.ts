import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./types";
import { User } from "@/lib/auth/authTypes";

export const useAuthStore = create<AuthStore>()(
  persist(
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
      name: "authStore",
    }
  )
);
