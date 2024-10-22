import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setIsLogin(data.isLogin === "true");
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생", error);
        setIsLogin(false);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return { isLogin, isLoading };
};
