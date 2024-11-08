import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/auth/authTypes";

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

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
