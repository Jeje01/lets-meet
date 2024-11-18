import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../Button";

export const Modal = ({
  isOpen,
  onClose,
  children,
  buttonText,
  onButtonClick,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: VoidFunction;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[18px] shadow-lg p-6 w-[90%] pb-[68px] max-w-md transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {children}
        <Button type="full" handleClick={onButtonClick}>
          {buttonText}
        </Button>
        <button onClick={onClose} className="absolute top-6 right-5">
          <Image height={24} width={24} alt="닫기" src="/img/close.png" />
        </button>
      </div>
    </div>
  );
};
