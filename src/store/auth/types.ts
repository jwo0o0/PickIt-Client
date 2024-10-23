import { User } from "@/lib/auth/types";
export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
