import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import React, { useCallback, useMemo, useState } from "react";

interface TermSelectorProps {
  value: { startDate: Date | null; endDate: Date | null };
  onChange: (value: { startDate: Date | null; endDate: Date | null }) => void;
}

const TermSelector: React.FC<TermSelectorProps> = React.memo(
  function TermSelector({ value, onChange }) {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const today = useMemo(() => new Date(), []);

    const normalizeDate = useCallback((date: Date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      return normalized;
    }, []);

    const handleDayClick = useCallback(
      (day: Date) => {
        const normalizedDay = normalizeDate(day);

        if (isBefore(normalizedDay, today) && !isSameDay(normalizedDay, today))
          return;

        if (!value?.startDate || (value.startDate && value.endDate)) {
          onChange({ startDate: normalizedDay, endDate: null });
        } else if (isBefore(normalizedDay, value.startDate)) {
          onChange({ startDate: normalizedDay, endDate: null });
        } else {
          onChange({ startDate: value.startDate, endDate: normalizedDay });
        }
      },
      [normalizeDate, onChange, today, value],
    );

    const handlePrevMonth = useCallback(
      () => setCurrentMonth((prev) => subMonths(prev, 1)),
      [],
    );
    const handleNextMonth = useCallback(
      () => setCurrentMonth((prev) => addMonths(prev, 1)),
      [],
    );

    const renderDays = useMemo(() => {
      const startDateOfMonth = startOfWeek(startOfMonth(currentMonth));
      const endDateOfMonth = endOfWeek(endOfMonth(currentMonth));
      let day = startDateOfMonth;
      const days: JSX.Element[] = [];

      while (day <= endDateOfMonth) {
        const normalizedDay = normalizeDate(day);
        const isToday = isSameDay(normalizedDay, today);
        const isDisabled = isBefore(normalizedDay, today) && !isToday;
        const isSelectedStart =
          value?.startDate && isSameDay(normalizedDay, value.startDate);
        const isSelectedEnd =
          value?.endDate && isSameDay(normalizedDay, value.endDate);
        const isInRange =
          value?.startDate &&
          value?.endDate &&
          isWithinInterval(normalizedDay, {
            start: value.startDate,
            end: value.endDate,
          });

        let label = "";
        if (isSelectedStart && isSelectedEnd) label = "시작/끝";
        else if (isSelectedStart) label = "시작";
        else if (isSelectedEnd) label = "끝";
        else if (isToday) label = "오늘";
        else if (isInRange) label = "";

        days.push(
          <div
            key={normalizedDay.toString()}
            className={`relative flex flex-col items-center justify-center w-[40px] h-[40px] text-center text-[14px] cursor-pointer ${
              isDisabled
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200"
            } ${
              isSelectedStart || isSelectedEnd
                ? "bg-[#FF570F] text-black rounded-full"
                : isInRange
                  ? "bg-[#FFDCCC] text-[#E53509] rounded-none"
                  : ""
            } ${isToday ? "bg-white text-[#E53509] font-bold rounded-full" : ""}`}
            style={{
              aspectRatio: "1 / 1",
            }}
            onClick={() => !isDisabled && handleDayClick(normalizedDay)}
          >
            <div>{format(normalizedDay, "d")}</div>
            <div className="text-[7px] mt-1">{label}</div>
          </div>,
        );
        day = addDays(day, 1);
      }

      return days;
    }, [currentMonth, normalizeDate, today, value, handleDayClick]);

    return (
      <div className="w-full max-w-[420px] border rounded-lg shadow-lg p-4 bg-[#F3F2F8]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {format(currentMonth, "yyyy년 MM월", { locale: ko })}
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

        <div className="grid grid-cols-7 gap-0 justify-items-center items-center">
          {renderDays}
        </div>
      </div>
    );
  },
);

export default TermSelector;
