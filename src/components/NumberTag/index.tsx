export const NumberTag = ({ num }: { num: number }) => {
  const backgroundColor = num === 1 ? "[#ff570f]" : "white";

  return (
    <div
      className={`rounded-[10px] bg-${backgroundColor} text-black text-xs font-bold w-[18px] h-[18px] flex items-center justify-center`}
    >
      {num}
    </div>
  );
};
