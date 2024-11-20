import { API_HOST } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

interface LoginRequest {
  username: string;
  scheduleId: string;
  password: string;
}

interface LoginResponse {
  token: string; // JWT 토큰
}

const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => {
      return fetch(`${API_HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error("Login failed"));
        }
        return response.json();
      });
    },
  });
};

export default useLogin;
