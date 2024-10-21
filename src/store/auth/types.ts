import { User } from "@/lib/auth/types";
export interface AuthStore {
  isLogin: boolean;
  user: User | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
}
