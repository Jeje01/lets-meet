"use client";

import { Button, Input } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const [value, setValue] = useState("");
  return (
    <div className="p-6 bg-[#FFF6E4] h-screen max-w-[420px]">
      <div className="float-right mb-20">
        <Button
          type="small"
          handleClick={() => push("https://github.com/ROLIRA-inc")}
        >
          About
        </Button>
      </div>
      <div className="px-4">
        <img alt="let's meet" src="/img/main.png" className="px-4" />
        <p className="text-black text-[18px] mb-14 font-normal mt-4 text-center">
          모두의 일정을 한 곳에서
        </p>
        <Button type="regular" handleClick={() => push("/create-schedule")}>
          <Image
            src="/icons/calendar.png"
            alt="달력 아이콘"
            width={24}
            height={24}
            className="mr-[10px]"
          />
          일정 생성하기
        </Button>
        <p className="my-6 text-center text-xl text-black">또는</p>
        <Input
          placeholder="초대 코드"
          hasButton
          buttonText="입력"
          value={value}
          onClick={() => push(`/vote-schedule?code=${value}`)}
          disabled={value === ""}
          setValue={setValue}
        />
      </div>
    </div>
  );
}
