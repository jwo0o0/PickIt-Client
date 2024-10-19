export interface User {
  id: number;
  email: string;
  nickname: string;
  bio?: string | null;
}

export interface AuthUser {
  message: string;
  user: User;
}

export interface UserDTO {
  email: string;
  password: string;
  nickname: string;
  bio: string;
  profileImage: File | null;
}
