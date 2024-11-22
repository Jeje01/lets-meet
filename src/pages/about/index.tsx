import { Label, NavigationBar } from "@/components";
import { LinkedinFilled } from "@ant-design/icons";
const About = () => {
  const Makers = [
    {
      name: "장재은",
      linkedin:
        "https://www.linkedin.com/in/%EC%9E%AC%EC%9D%80-%EC%9E%A5-993578192/",
      role: "PM, FE 개발, 기획",
    },
    {
      name: "김수현",
      linkedin: "",
      role: "브랜딩, UI/UX 디자인, 기획",
    },
    {
      name: "박준규",
      linkedin: "",
      role: "인프라, BE 개발, 기획",
    },
  ];

  const PersonInfo = ({
    name,
    linkedin,
    role,
  }: {
    name: string;
    linkedin: string;
    role: string;
  }) => {
    return (
      <li className="list-none">
        <Label text={name} />
        <p>
          <a href={linkedin}>
            <LinkedinFilled className="mr-1 text-[#0e76a8]" />
          </a>
          <span className="text-[14px] text-[#27232E]">{role}</span>
        </p>
      </li>
    );
  };

  return (
    <div className="pt-[40px] bg-[#E8E6EF] min-h-full max-w-[420px] w-full">
      <NavigationBar title="About" showBackButton />
      <div className="px-[24px]">
        {Makers.map(({ name, linkedin, role }) => (
          <PersonInfo key={name} name={name} linkedin={linkedin} role={role} />
        ))}
      </div>
    </div>
  );
};

export default About;
