import { API_HOST } from "@/constants/api";
import { useMutation } from "@tanstack/react-query";

interface UpdateScheduleRequest {
  id: string; // Path parameter
  votes: string[]; // Request body
}

interface UpdateScheduleResponse {
  votes: string[]; // Updated votes
  scheduleId: string; // ID of the updated schedule
}

const useUpdateSchedule = () => {
  return useMutation<UpdateScheduleResponse, Error, UpdateScheduleRequest>({
    mutationFn: ({ id, votes }: UpdateScheduleRequest) => {
      return fetch(`${API_HOST}/schedule/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
