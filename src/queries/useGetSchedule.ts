import { API_HOST } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";

interface ScheduleResponse {
  scheduleName: string;
  isNamedVote: boolean;
  period: {
    start: string;
    end: string;
  };
  votes: {
    [date: string]: string[];
  };
}

const useGetSchedule = (id: string) => {
  return useQuery<ScheduleResponse, Error>({
    queryKey: ["schedule", [id]],
    queryFn: () => {
      return fetch(`${API_HOST}/schedule/${id}`, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      }).then((response) => {
        if (!response.ok) {
          return Promise.reject(new Error("Failed to get schedule"));
        }
        return response.json() as Promise<ScheduleResponse>;
      });
    },
  });
};

export default useGetSchedule;
