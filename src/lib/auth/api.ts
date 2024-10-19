import axios from "axios";
import { axiosInstance } from "@/apis/axiosInstance";
import { AuthUser } from "./types";

/**
 * 회원가입
 * @param email 이메일
 * @param nickname 닉네임
 * @param password 비밀번호
 * @param bio 소개
 * @returns
 */
export const signUpAPI = async (
  email: string,
  nickname: string,
  password: string,
  bio: string
): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      nickname,
      password,
      bio,
    });
    return response.data as AuthUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "로그인에 실패했습니다."
      );
    }
    throw new Error("로그인에 실패했습니다.");
  }
};

export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "로그아웃에 실패했습니다."
      );
    }
    throw new Error("로그아웃에 실패했습니다.");
  }
};

export const loginAPI = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "로그인에 실패했습니다."
      );
    }
    throw new Error("로그인에 실패했습니다.");
  }
};
