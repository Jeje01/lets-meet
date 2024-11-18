import {
  Button,
  Input,
  Label,
  Modal,
  NavigationBar,
  ToggleButton,
} from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const CreateSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { push } = useRouter();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      scheduleType: "named",
    },
  });

  const scheduleType = watch("scheduleType");

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  const onSubmit = (data: { name: string; scheduleType: string }) => {
    // API 호출
    push("/vote-schedule?code=1234");
  };

  return (
    <div className="pt-[70px] bg-[#E8E6EF] h-full">
      <NavigationBar title="일정 생성하기" />
      <div className="px-[24px]">
        <form>
          <Label text="어떤 일정을 잡을까요?" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="약속 이름을 알려주세요"
                value={field.value}
                setValue={field.onChange}
              />
            )}
          />
          <Label text="일정 유형을 선택하세요" />
          <div className="flex w-full gap-[10px]">
            <ToggleButton
              text="기명 투표"
              clicked={scheduleType === "named"}
              onClick={() => setValue("scheduleType", "named")}
            />
            <ToggleButton
              text="익명 투표"
              clicked={scheduleType === "anonymous"}
              onClick={() => setValue("scheduleType", "anonymous")}
            />
          </div>
          <Button
            type="regular"
            style={{
              position: "fixed",
              bottom: 24,
              width: "calc(100% - 48px)",
            }}
            handleClick={() => setIsModalOpen(true)}
            htmlType="button"
          >
            일정 생성하기
          </Button>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buttonText="일정 생성하기"
        onButtonClick={handleSubmit(onSubmit)}
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
          <p className="mb-6 font-normal text-[14px]">{watch("name")}</p>
          <h3 className="text-[#27232e] text-[16px] font-bold mb-[10px]">
            투표 범위
          </h3>
          <p className="mb-6 font-normal text-[14px]">에베베베베</p>
          <h3 className="text-[#27232e] text-[16px] font-bold mb-[10px]">
            투표 공개 설정
          </h3>
          <p className="mb-6 font-normal text-[14px]">
            {watch("scheduleType") === "named" ? "기명 투표" : "익명 투표"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CreateSchedule;
