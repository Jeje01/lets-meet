import { API_HOST } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

interface UpdateScheduleRequest {
  id: string;
  votes: string[];
  token: string;
}

interface UpdateScheduleResponse {
  votes: string[];
  scheduleId: string;
}

const useUpdateSchedule = () => {
  return useMutation<UpdateScheduleResponse, Error, UpdateScheduleRequest>({
    mutationFn: ({ id, votes, token }: UpdateScheduleRequest) => {
      console.log({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return fetch(`${API_HOST}/schedule/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ votes }),
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error("Failed to update schedule"));
        }
        return response.json();
      });
    },
  });
};

export default useUpdateSchedule;
