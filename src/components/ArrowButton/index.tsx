import Image from "next/image";

export const ArrowButton = ({
  opened,
  onClick,
}: {
  opened: boolean;
  onClick?: VoidFunction;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 rounded-xl bg-white flex justify-center items-center"
    >
      <Image
        alt=""
        src={`/img/chevron-${opened ? "left" : "down"}.png`}
        width={opened ? 6 : 11}
        height={opened ? 11 : 6}
      />
    </button>
  );
};
