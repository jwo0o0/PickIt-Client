import { useMutation } from "@tanstack/react-query";
import { AuthUser } from "../authTypes";
import { customFetch, AUTH_API } from "@/apis";

export const useLogin = () => {
  return useMutation<AuthUser, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      return customFetch(AUTH_API.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
    },
  });
};
