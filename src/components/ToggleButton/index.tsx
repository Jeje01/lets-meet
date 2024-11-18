export const ToggleButton = ({
  clicked,
  text,
  onClick,
}: {
  clicked: boolean;
  text: string;
  onClick: VoidFunction;
}) => {
  const commonStyle = "rounded-[18px] py-3 flex justify-center text-lg w-full";

  const clickedStyle = clicked
    ? "bg-[#ff570f] text-white text-bold"
    : "bg-white text-black";

  return (
    <button
      onClick={onClick}
      className={`${commonStyle} ${clickedStyle} text-lg`}
    >
      {text}
    </button>
  );
};
