"use client";

import { Button } from "@/components";
import Image from "next/image";

export default function Home() {
  //
  return (
    <div className="w-full h-full bg-white items-center pt-20 flex flex-col gap-2">
      {/* <div className="w-[400px]"> */}
      {/* <Calendar fullscreen={false} /> */}
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
      <div className="h-[400px] shadow-lg w-[400px] shadow-black rounded-[18px]">
        <Button type="full" handleClick={() => (location.href = "/")}>
          일정
        </Button>
      </div>
    </div>
  );
}
