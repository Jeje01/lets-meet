import { API_HOST } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

interface ScheduleRequest {
  scheduleName: string;
  isNamedVote: boolean;
  period: {
    start: string;
    end: string;
  };
}

interface ScheduleResponse {
  scheduleId: string;
}

const useCreateSchedule = () => {
  return useMutation<ScheduleResponse, Error, ScheduleRequest>({
    mutationFn: (data: ScheduleRequest) => {
      return fetch(`${API_HOST}/schedule/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*", // Postman 헤더와 동일하게 추가
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error("Failed to create schedule"));
        }
        return response.json();
      });
    },
  });
};

export default useCreateSchedule;
