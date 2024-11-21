import { API_HOST } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

interface LoginRequest {
  username: string;
  password: string;
  scheduleId: string;
}

const useLogin = () => {
  return useMutation<string, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.text();
    },
  });
};

export default useLogin;
