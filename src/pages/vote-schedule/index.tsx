import { Button, Input, Label, Modal, NavigationBar } from "@/components";
import Calendar from "@/components/Calendar";
import DateVoter from "@/components/DateVoters";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  id: string;
  password: string;
}

const VoteSchedule = () => {
  const title = "2024 하반기 워크샵";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const handleClickSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setIsModalOpen(false);
  };

  const votes: { [key: string]: string[] } = {
    "2024-11-05": ["user1", "user2", "user3", "user4"],
    "2024-11-07": ["user3"],
  };

  return (
    <div className="pt-[70px] bg-[#E8E6EF] h-full pb-[140px] min-h-fit">
      <NavigationBar title="일정 투표하기" />
      <div className="p-6">
        <h1 className="text-[44px] mb-[44px] font-bold break-keep">{title}</h1>
        <Calendar
          period={{
            start: "2024-11-01",
            end: "2024-12-01",
          }}
          votes={votes}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex items-center justify-between">
          <Label text="투표 결과" />
          <p className="min-w-fit mt-[36px] mb-[12px] font-[400] text-[#797979] text-[12px]">
            총 n명 투표 완료
          </p>
        </div>
        {Object.keys(votes).map((date, index) => (
          <DateVoter
            key={date}
            rank={index + 1}
            date={date}
            voters={votes[date]}
          />
        ))}
      </div>
      <Button
        type="regular"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          width: "calc(100% - 48px)",
        }}
        handleClick={() => setIsModalOpen(true)}
        htmlType="button"
        disabled={!selectedDate.length}
      >
        {!selectedDate.length
          ? "투표할 날짜를 선택하세요"
          : `${selectedDate.length}개의 날짜 투표하기`}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText="로그인하기"
        onButtonClick={handleSubmit(handleClickSubmit)}
      >
        <h2 className="text-xl font-bold mb-6">로그인하기</h2>
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="아이디"
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="비밀번호"
              value={field.value}
              setValue={field.onChange}
            />
          )}
        />
      </Modal>
    </div>
  );
};

export default VoteSchedule;
