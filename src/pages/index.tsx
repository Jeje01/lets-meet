"use client";

import { ArrowButton, Button, Input, Label, Tags } from "@/components";
import { NumberTag } from "@/components/NumberTag";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full h-full bg-white items-center pt-20 flex flex-col gap-2">
      <Button type="small" handleClick={() => (location.href = "/")}>
        About
      </Button>
      <Button type="regular" handleClick={() => (location.href = "/")}>
        <Image
          src="/icons/calendar.png"
          alt="달력 아이콘"
          width={24}
          height={24}
          className="mr-[10px]"
        />
        일정 생성하기
      </Button>
      <div className="h-[400px] shadow-lg w-[400px] shadow-black rounded-[18px] relative overflow-hidden">
        <Button type="full" handleClick={() => (location.href = "/")}>
          일정
        </Button>
      </div>
      <div className="w-[400px] h-[300px] p-4 bg-black">
        <Tags
          tags={[
            "tag1",
            "tag2",
            "tag3",
            "tag1",
            "tag2",
            "tag3",
            "tag1",
            "tag2",
            "tag3",
            "tag1",
            "tag2",
            "tag3",
          ]}
        />
        <NumberTag num={1} />
        <NumberTag num={2} />
        <NumberTag num={3} />
        <ArrowButton opened={opened} onClick={() => setOpened(!opened)} />
        <Input
          placeholder="placeholder"
          value={value}
          setValue={setValue}
          hasButton
          buttonText="입력"
        />
      </div>
      <Label text="어떤 일정을 잡을까요?" />
    </div>
  );
}
