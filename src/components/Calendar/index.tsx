import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
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
  updatedSelectedDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  period,
  votes,
  selectedDate,
  updatedSelectedDate,
}) => {
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);

  const [currentMonth, setCurrentMonth] = useState<Date>(startDate);

  const normalizeDate = useCallback((date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const handleDayClick = useCallback((day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd");

    updatedSelectedDate(formattedDate);
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
      const saturation = Math.min(voteCount / 10, 1); // 최대 채도는 1
      const backgroundColor = voteCount
        ? `rgba(255, 87, 15, ${saturation})`
        : "white";

      days.push(
        <div
          key={normalizedDay.toString()}
          className={`p-2 text-center text-[14px] cursor-pointer ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200"
          } ${!isDisabled ? "rounded-full" : ""} ${
            isSelected ? "border-black border-2" : ""
          }
          `}
          style={{
            backgroundColor: !isDisabled ? backgroundColor : undefined,
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
    <div className="w-80 border rounded-lg shadow-lg p-4 bg-[#F3F2F8]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "yyyy년 MM월")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            {"<"}
          </button>
          <button
            onClick={handleNextMonth}
            className="text-gray-600 hover:text-gray-800"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">{renderDays}</div>
    </div>
  );
};

export default Calendar;
