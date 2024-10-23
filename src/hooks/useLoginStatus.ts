import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";

export const useLoginStatus = () => {
  const cookies = getCookies();
  const isLogin = cookies.isLogin === "true";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLogin]);

  return { isLogin, isLoading };
};
