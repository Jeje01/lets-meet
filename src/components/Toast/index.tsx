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
      className={`fixed inline-flex flex gap-[10px] bottom-[44px] left-1/2 transform -translate-x-1/2 pl-8 pr-14 py-5 text-black bg-white text-lg font-bold rounded-[50px] shadow-[0px_0px_12px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } whitespace-nowrap`}
    >
      <Image src="/img/check.png" alt="" width={25} height={24} />
      <span>{message}</span>
    </div>
  );
};
