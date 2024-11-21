import { useState } from "react";
import { ArrowButton } from "../ArrowButton";
import { NumberTag } from "../NumberTag";
import { Tags } from "../Tags";

interface DateVoterProps {
  rank: number;
  date: string;
  voters: string[];
}

export const DateVoter = ({ rank, date, voters }: DateVoterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const formatDateToKorean = (dateString: string): string => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#F3F1F8] rounded-lg shadow-md mb-3">
      <div className="border-b">
        <button
          className="w-full text-left px-4 py-3 focus:outline-none flex justify-between items-center"
          onClick={handleToggle}
        >
          <div className="flex items-center">
            <NumberTag num={rank} />
            <span className="text-black font-[500] text-[20px] mx-[10px]">
              {formatDateToKorean(date)}
            </span>
            <span className="text-[14px] font-normal text-[#FF570F] mr-1">
              {voters.length}명
            </span>
            <span className="text-[14px] font-normal text-black">투표</span>
          </div>
          <ArrowButton opened={isOpen} />
        </button>
        {isOpen && (
          <div className="p-[20px]">
            <Tags tags={voters} />
          </div>
        )}
      </div>
    </div>
  );
};
