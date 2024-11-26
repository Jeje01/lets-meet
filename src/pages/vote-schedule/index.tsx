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
import Head from "next/head";
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
  const { mutate: updateSchedule, mutateAsync: updateScheduleMutateAsync } =
    useUpdateSchedule();
  const { mutate: login, mutateAsync: loginMutateAsync } = useLogin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [currentDateVoters, setCurrentDateVoters] = useState<string[]>([]);

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

  const handleUpdateSchedule = async (currentToken?: string) => {
    if (!selectedDate.length || (!token && !currentToken)) return;

    try {
      await updateScheduleMutateAsync({
        id: scheduleId,
        votes: selectedDate,
        token: currentToken || token || "",
      });
      setShowToast(true);
      refetch();
      setSelectedDate([]);
    } catch (error: any) {
      message.error(
        `일정 업데이트 실패: ${error?.message || "알 수 없는 오류"}`,
      );
      localStorage.removeItem("token");
      setToken(null);
      setIsModalOpen(true);
    }
  };

  const handleLoginAndUpdate = async (formData: FormValues) => {
    try {
      const receivedToken = await loginMutateAsync({
        username: formData.id,
        password: formData.password,
        scheduleId,
      });

      setToken(receivedToken);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", receivedToken);
      }

      await handleUpdateSchedule(receivedToken);

      setIsModalOpen(false);
    } catch (error) {
      message.error("로그인 실패");
    }
  };

  const handleButtonClick = () => {
    if (token) {
      handleUpdateSchedule();
    } else {
      setIsModalOpen(true);
    }
  };

  const votesSorted = Object.entries(data?.votes ?? {})
    .filter(([, voters]) => voters.length > 0)
    .sort(([, votersA], [, votersB]) => votersB.length - votersA.length);

  const uniqueVoters = new Set(Object.values(data?.votes ?? {}).flat());
  const totalUniqueVoters = uniqueVoters.size;

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError || !data) {
    return <p>일정 없음</p>;
  }

  return (
    <>
      <Head>
        <title>{data?.scheduleName || "일정 투표하기"}</title>
        <meta
          name="description"
          content={`${data?.scheduleName} 일정 투표를 진행합니다.`}
        />
        <meta
          property="og:title"
          content={data?.scheduleName || "일정 투표하기"}
        />
        <meta
          property="og:description"
          content={`${data?.scheduleName} 일정 투표를 진행합니다.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://letsmeet.kr/img/main.png" />
      </Head>
      <div className="pt-[50px] bg-[#E8E6EF] w-full max-w-[420px] h-full pb-[140px] min-h-fit">
        <NavigationBar title="일정 투표하기" showBackButton={false} />
        <div className="p-6">
          <h1 className="text-[40px] mb-[10px] font-bold break-keep">
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
            totalVoters={totalUniqueVoters}
            scheduleId={scheduleId}
            setCurrentDateVoters={setCurrentDateVoters}
          />
          <div>
            <p className="min-w-fit mt-[18px] font-[400] text-[#797979] text-[12px]">
              이 날 투표자 :{" "}
              {currentDateVoters?.length
                ? currentDateVoters.join(", ")
                : "없음"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Label text="투표 결과" />
            <p className="min-w-fit mt-[36px] mb-[12px] font-[400] text-[#797979] text-[12px]">
              {totalUniqueVoters === 0
                ? "투표자 없음"
                : `총 ${totalUniqueVoters}명 투표 완료`}
            </p>
          </div>
          {votesSorted?.length ? (
            votesSorted.map(([date, voters], index) => (
              <DateVoter
                key={date}
                rank={index + 1}
                date={date}
                voters={voters}
                isAnonymous={!data?.isNamedVote}
              />
            ))
          ) : (
            <div className="w-full max-w-md mx-auto bg-[#F3F1F8] rounded-lg shadow-md mb-3 p-4 text-[#868193] text-[16px]">
              아직 투표자가 없습니다
            </div>
          )}
        </div>
        <Button
          type="regular"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
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
          buttonText="이름 설정하기"
          onButtonClick={handleSubmit(handleLoginAndUpdate)}
        >
          <h2 className="text-xl font-bold mb-6">이름 입력하기</h2>
          <div className="pb-[24px] flex flex-col gap-4">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="이름"
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
                  placeholder="임시 비밀번호"
                  value={field.value}
                  setValue={field.onChange}
                  password
                />
              )}
            />
            <p className="text-[12px] text-[#797979]">
              * 별도의 회원가입이 필요없습니다.
              <br />* 임시 비밀번호는 수정 시에만 사용됩니다.
            </p>
          </div>
        </Modal>

        {showToast && (
          <Toast
            message="투표를 완료했어요"
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[420px] h-[120px]">
          <div className="absolute bottom-0 left-0 w-full h-[90px] bg-white"></div>
          <div className="absolute top-0 left-0 w-full h-[30px] bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default VoteSchedule;
