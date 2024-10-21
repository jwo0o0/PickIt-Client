import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./types";
import { User } from "@/lib/auth/types";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: false,
      user: null,
      setIsLogin: (isLogin: boolean) => {
        set({ isLogin });
      },
      setUser: (user: User) => {
        set({ user, isLogin: true });
      },
      logout: () => {
        set({ user: null, isLogin: false });
      },
    }),
    {
      name: "authStorage",
    }
  )
);
