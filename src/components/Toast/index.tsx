import Image from "next/image";
import { useEffect, useState } from "react";

export const Toast = ({
  message,
  duration = 3000,
  onClose,
}: {
  message: string;
  duration?: number;
  onClose?: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed flex gap-[10px] bottom-[44px] left-1/2 transform -translate-x-1/2 px-10 py-5 text-black bg-white text-lg font-bold rounded-[50px] shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Image src="/img/check.png" alt="" width={25} height={24} />
      {message}
    </div>
  );
};
