import useGetSchedule from "@/queries/useGetSchedule";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";

interface CalendarProps {
  period: {
    start: string;
    end: string;
  };
  votes: {
    [date: string]: string[];
  };
  selectedDate: string[];
  setSelectedDate: React.Dispatch<React.SetStateAction<string[]>>;
  totalVoters: number;
  scheduleId: string;
  setCurrentDateVoters: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Calendar: React.FC<CalendarProps> = ({
  period,
  votes,
  selectedDate,
  setSelectedDate,
  totalVoters,
  scheduleId,
  setCurrentDateVoters,
}) => {
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);

  const [currentMonth, setCurrentMonth] = useState<Date>(startDate);
  const { data: scheduleData } = useGetSchedule(scheduleId);
  const normalizeDate = useCallback((date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const handleDayClick = useCallback((day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");

    if (scheduleData?.votes[formattedDate]) {
      setCurrentDateVoters(scheduleData.votes[formattedDate]);
    }

    setSelectedDate((prevSelectedDate: string[]) => {
      if (prevSelectedDate.includes(formattedDate)) {
        // 이미 선택된 날짜이면 제거
        return prevSelectedDate.filter((date) => date !== formattedDate);
      } else {
        // 선택되지 않은 날짜이면 추가
        return [...prevSelectedDate, formattedDate];
      }
    });
  }, []);

  const handlePrevMonth = useCallback(
    () => setCurrentMonth((prev) => addDays(prev, -30)),
    [],
  );
  const handleNextMonth = useCallback(
    () => setCurrentMonth((prev) => addDays(prev, 30)),
    [],
  );

  const renderDays = useMemo(() => {
    const startDateOfMonth = startOfWeek(startOfMonth(currentMonth));
    const endDateOfMonth = endOfWeek(endOfMonth(currentMonth));
    let day = startDateOfMonth;
    const days: JSX.Element[] = [];

    while (day <= endDateOfMonth) {
      const normalizedDay = normalizeDate(day);
      const formattedDate = format(normalizedDay, "yyyy-MM-dd");
      const isDisabled = !isWithinInterval(normalizedDay, {
        start: normalizeDate(startDate),
        end: normalizeDate(endDate),
      });
      const isSelected = selectedDate.includes(formattedDate);

      const voteCount = votes[formattedDate]?.length || 0;
      const saturation = Math.min(voteCount / totalVoters, 1);
      const backgroundColor = voteCount
        ? `rgba(255, 87, 15, ${saturation})`
        : "white";

      days.push(
        <div
          key={normalizedDay.toString()}
          className={`relative p-1 sm:p-2 text-center text-[14px] cursor-pointer ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200"
          } ${!isDisabled ? "rounded-full" : ""} ${
            isSelected ? "border-2 border-black" : "border-2 border-transparent"
          }`}
          style={{
            backgroundColor: !isDisabled ? backgroundColor : undefined,
            boxSizing: "border-box",
            width: "40px",
            height: "40px",
          }}
          onClick={() => !isDisabled && handleDayClick(normalizedDay)}
        >
          <div>{format(normalizedDay, "d")}</div>
        </div>,
      );
      day = addDays(day, 1);
    }

    return days;
  }, [currentMonth, normalizeDate, startDate, endDate, votes, handleDayClick]);

  return (
    <div className="w-full border rounded-lg shadow-lg p-4 bg-[#F3F2F8]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "yyyy년 MM월")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            <Image
              src="/icons/chevron-left.png"
              alt="이전 달"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={handleNextMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            <Image
              src="/icons/chevron-right.png"
              alt="이전 달"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[2px] sm:gap-[4px]">
        {renderDays}
      </div>
    </div>
  );
};
