import { Label, NavigationBar } from "@/components";
import { LinkedinFilled } from "@ant-design/icons";
const About = () => {
  return (
    <div className="pt-[40px] bg-[#E8E6EF] min-h-full">
      <NavigationBar title="About" showBackButton />
      <div className="px-[24px] ">
        <Label text="김수현" />
        <p>
          <LinkedinFilled className="mr-1" />
          레리
        </p>
        <Label text="장재은" />
        <p>
          <a href="https://www.linkedin.com/in/%EC%9E%AC%EC%9D%80-%EC%9E%A5-993578192/">
            <LinkedinFilled className="mr-1" />
          </a>
          리스본
        </p>
        <Label text="박준규" />
        <p>
          <LinkedinFilled className="mr-1" />
          로먼
        </p>
      </div>
    </div>
  );
};

export default About;
