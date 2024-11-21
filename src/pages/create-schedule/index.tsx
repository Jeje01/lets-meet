import {
  Button,
  Input,
  Label,
  Modal,
  NavigationBar,
  ToggleButton,
} from "@/components";
import TermSelector from "@/components/TermSelector";
import useCreateSchedule from "@/queries/useCreateSchedule";
import { message } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CreateSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push } = useRouter();
  const { mutate } = useCreateSchedule();

  const [scheduleName, setScheduleName] = useState("");
  const [isNamedVote, setIsNamedVote] = useState(true);
  const [period, setPeriod] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const onSubmit = () => {
    if (!scheduleName || !period.startDate || !period.endDate) {
      message.error("모든 항목을 입력해주세요.");
      return;
    }
    const payload = {
      scheduleName,
      isNamedVote,
      period: {
        start: format(period.startDate, "yyyy-MM-dd"),
        end: format(period.endDate, "yyyy-MM-dd"),
      },
    };

    mutate(payload, {
      onSuccess: (response) => {
        const scheduleId = response.scheduleId;
        push(`/vote-schedule?code=${scheduleId}`);
      },
      onError: () => {
        message.error("일정 생성 중 문제가 발생했습니다.");
      },
    });
  };

  return (
    <div className="pt-[70px] bg-[#E8E6EF] max-w-[420px] pb-[140px] w-full h-full min-h-fit">
      <NavigationBar title="일정 생성하기" />
      <div className="px-[24px]">
        <Label text="어떤 일정을 잡을까요?" />
        <Input
          placeholder="약속 이름을 알려주세요"
          value={scheduleName}
          setValue={setScheduleName}
        />
        <Label text="날짜를 선택해주세요" />
        <TermSelector value={period} onChange={(value) => setPeriod(value)} />
        <Label text="일정 유형을 선택하세요" />
        <ToggleButtons isNamedVote={isNamedVote} onToggle={setIsNamedVote} />
        <Button
          type="regular"
          style={{
            position: "fixed",
            bottom: 24,
            width: "calc(100% - 48px)",
          }}
          handleClick={() => setIsModalOpen(true)}
          htmlType="button"
          disabled={!scheduleName || !period.startDate || !period.endDate}
        >
          일정 생성하기
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText="일정 생성하기"
        onButtonClick={onSubmit}
      >
        <h2 className="text-xl font-bold mb-6">
          다음 내용으로
          <br />
          일정을 생성할까요?
        </h2>
        <div className="pb-6">
          <h3 className="text-[#27232e] text-[16px] font-bold mb-[10px]">
            약속 제목
          </h3>
          <p className="mb-6 font-normal text-[14px]">
            {scheduleName || "입력되지 않음"}
          </p>
          <h3 className="text-[#27232e] text-[16px] font-bold mb-[10px]">
            투표 범위
          </h3>
          <p className="mb-6 font-normal text-[14px]">
            {period.startDate
              ? `${format(period.startDate, "yyyy-MM-dd")} ~ ${
                  period.endDate
                    ? format(period.endDate, "yyyy-MM-dd")
                    : "종료 날짜 없음"
                }`
              : "날짜를 선택하세요"}
          </p>
          <h3 className="text-[#27232e] text-[16px] font-bold mb-[10px]">
            투표 공개 설정
          </h3>
          <p className="mb-6 font-normal text-[14px]">
            {isNamedVote ? "기명 투표" : "익명 투표"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

const ToggleButtons = React.memo(
  ({
    isNamedVote,
    onToggle,
  }: {
    isNamedVote: boolean;
    onToggle: (value: boolean) => void;
  }) => {
    return (
      <div className="flex w-full gap-[10px]">
        <ToggleButton
          text="기명 투표"
          clicked={isNamedVote}
          onClick={() => onToggle(true)}
        />
        <ToggleButton
          text="익명 투표"
          clicked={!isNamedVote}
          onClick={() => onToggle(false)}
        />
      </div>
    );
  },
);

ToggleButtons.displayName = "ToggleButtons";

export default CreateSchedule;
