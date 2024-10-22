import { useState, useEffect } from "react";

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log("data", data);
        setIsLogin(data.isLogin === "true");
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생", error);
        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return { isLogin, isLoading };
};
