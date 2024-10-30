import { User } from "@/lib/auth/authTypes";
export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
