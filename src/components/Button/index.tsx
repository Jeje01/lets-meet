import { ButtonType } from "@/types";
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
  htmlType = "button",
  style,
  disabled,
}: {
  children: React.ReactNode;
  handleClick: VoidFunction;
  type: ButtonType;
  htmlType?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const buttonStyle = getButtonStyle(type);
  const disabledStyle = "bg-[#b3aec2] text-[#5d586b]";

  return (
    <button
      type={htmlType}
      className={`w-fit box-border flex justify-center items-center ${buttonStyle} ${disabled ? disabledStyle : ""}`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </button>
  );
};
