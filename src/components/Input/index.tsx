export const Input = ({
  placeholder,
  value,
  setValue,
  hasButton = false,
  buttonText,
  onClick,
  disabled = true,
  password = false,
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  hasButton?: boolean;
  buttonText?: string;
  onClick?: VoidFunction;
  disabled?: boolean;
  password?: boolean;
}) => {
  const buttonStyle = disabled
    ? "bg-[#d5d5d5] font-normal text-[#797979]"
    : "bg-[#ff570f] font-bold text-black";

  return (
    <div className="relative">
      <input
        type={password ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 h-16 p-5 text-lg rounded-[18px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] w-full"
      />
      {hasButton && (
        <button
          onClick={disabled ? () => {} : onClick}
          className={`absolute right-[18px] top-3 py-2 px-3 rounded-[30px] text-[18px] ${buttonStyle}`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
