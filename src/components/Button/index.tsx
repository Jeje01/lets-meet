import { ButtonType } from "@/types";
import { ReactNode } from "react";
import { match } from "ts-pattern";

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
    .with("full", () => "")
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
