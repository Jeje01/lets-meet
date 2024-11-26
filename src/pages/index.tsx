"use client";

import { Button, Input } from "@/components";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
export default function Home() {
  const { push } = useRouter();
  const [value, setValue] = useState("");
  return (
    <div className="p-6 bg-[#FFF6E4] h-screen max-w-[420px]">
      <Head>
        <title>{`일정 잡기 | Let's Meet - 모임 일정 조율 서비스`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="일정 잡기가 어려우신가요? Let's Meet에서 모임 참석자들의 일정을 손쉽게 조율하세요. 투표 시스템으로 모두가 참석 가능한 시간을 쉽게 찾을 수 있습니다."
        />
        <meta
          name="keywords"
          content="일정 잡기, 약속 잡기, 일정 조율, 모임 일정, 투표, 일정 관리, 미팅 스케줄, 일정 조정"
        />

        <meta
          property="og:title"
          content="일정 잡기 | Let's Meet - 간편한 모임 일정 조율 서비스"
        />
        <meta
          property="og:description"
          content="일정 잡기가 어려우신가요? Let's Meet에서 모임 참석자들의 일정을 손쉽게 조율하세요. 투표 시스템으로 모두가 참석 가능한 시간을 쉽게 찾을 수 있습니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://letsmeet.kr/img/main.png" />
        <meta property="og:url" content="https://letsmeet.kr" />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://letsmeet.kr" />
      </Head>
      <div className="float-right mb-20">
        <Button type="small" handleClick={() => push("/about")}>
          About
        </Button>
      </div>
      <div className="px-4">
        <img
          alt="일정 잡기 서비스 Let's Meet"
          src="/img/main.png"
          className="px-4"
        />
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
