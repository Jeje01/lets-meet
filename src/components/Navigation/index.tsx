import Image from "next/image";
import { useRouter } from "next/router";

export const NavigationBar = ({
  title,
  showBackButton = true,
}: {
  title: string;
  showBackButton?: boolean;
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (router.asPath !== "/") {
      router.back();
    }
  };

  return (
    <div className="w-full h-[72px] flex items-center px-4 bg-[#E8E6EF] shadow-md relative">
      {showBackButton && (
        <button onClick={handleBackClick}>
          <Image src="/img/back.png" alt="뒤로가기" width={24} height={24} />
        </button>
      )}
      <h1 className="text-xl text-center font-bold text-gray-800 flex-grow">
        {title}
      </h1>
    </div>
  );
};
