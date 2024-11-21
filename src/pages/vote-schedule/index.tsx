import {
  Button,
  Calendar,
  DateVoter,
  Input,
  Label,
  Modal,
  NavigationBar,
  Toast,
} from "@/components";
import useGetSchedule from "@/queries/useGetSchedule";
import useLogin from "@/queries/useLogin";
import useUpdateSchedule from "@/queries/useUpdateSchedule";
import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  id: string;
  password: string;
}

const VoteSchedule = () => {
  const { query } = useRouter();
  const scheduleId = query.code as string;
  const { data, isLoading, isError, refetch } = useGetSchedule(scheduleId);
  const { mutate: updateSchedule } = useUpdateSchedule();
  const { mutate: login } = useLogin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  
  const handleUpdateSchedule = () => {
    if (!selectedDate.length || !token) return;

    updateSchedule(
      { id: scheduleId, votes: selectedDate, token },
      {
        onSuccess: () => {
          setShowToast(true);
          refetch();
        },
        onError: (error) => {
          message.error(`일정 업데이트 실패: ${error?.message}`);
          localStorage.removeItem("token");
          setToken(null);
          setIsModalOpen(true);
        },
      },
    );
  };

  const handleLoginAndUpdate = (formData: FormValues) => {
    login(
      {
        username: formData.id,
        password: formData.password,
        scheduleId,
      },
      {
        onSuccess: (receivedToken) => {
          setToken(receivedToken);

          if (typeof window !== "undefined") {
            localStorage.setItem("token", receivedToken);
          }

          setTimeout(() => {
            handleUpdateSchedule();
          }, 0);
          setIsModalOpen(false);
        },
        onError: (error) => {
          message.error(`로그인 실패: ${error.message}`);
        },
      },
    );
  };

  const handleButtonClick = () => {
    if (token) {
      handleUpdateSchedule();
    } else {
      setIsModalOpen(true);
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError || !data) {
    return <p>일정 없음</p>;
  }

  return (
    <div className="pt-[70px] bg-[#E8E6EF] h-full pb-[140px] min-h-fit">
      <NavigationBar title="일정 투표하기" />
      <div className="p-6">
        <h1 className="text-[44px] mb-[44px] font-bold break-keep">
          {data.scheduleName}
        </h1>
        <Calendar
          period={{
            start: data.period.start,
            end: data.period.end,
          }}
          votes={data.votes}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex items-center justify-between">
          <Label text="투표 결과" />
          <p className="min-w-fit mt-[36px] mb-[12px] font-[400] text-[#797979] text-[12px]">
            총 {Object.keys(data.votes).length}명 투표 완료
          </p>
        </div>
        {Object.keys(data.votes).map((date, index) => (
          <DateVoter
            key={date}
            rank={index + 1}
            date={date}
            voters={data.votes[date]}
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
        handleClick={handleButtonClick}
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
        onButtonClick={handleSubmit(handleLoginAndUpdate)}
      >
        <h2 className="text-xl font-bold mb-6">로그인하기</h2>
        <div className="pb-[24px] flex flex-col gap-4">
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
                password
              />
            )}
          />
        </div>
      </Modal>
      {showToast && (
        <Toast
          message="투표를 완료했어요"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default VoteSchedule;
