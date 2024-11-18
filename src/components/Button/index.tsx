import { ButtonType } from "@/types";
import { ReactNode } from "react";
import { match } from "ts-pattern";

// TODO: disabled 상태 추가
const getButtonStyle = (buttonType: ButtonType) => {
  return match(buttonType)
    .with(
      "small",
      () =>
        "px-6 py-[10px] rounded-[70px] border-black border-solid border-[1px] bg-transparent",
    )
    .with(
      "regular",
      () =>
        "w-full rounded-[18px] text-black bg-[#FF570F] p-5 text-lg font-bold",
    )
    .with(
      "full",
      () =>
        "w-full bg-[#FF570F] p-5 text-lg font-bold fixed left-0 bottom-0 rounded-none z-10 rounded-b-[18px]",
    )
    .otherwise(() => "");
};

export const Button = ({
  children,
  handleClick,
  type,
}: {
  children: ReactNode;
  handleClick: VoidFunction;
  type: ButtonType;
}) => {
  const buttonStyle = getButtonStyle(type);

  return (
    <button
      className={`w-fit box-border flex justify-center items-center ${buttonStyle}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
