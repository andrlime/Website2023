import { FC } from 'react';

const Heading: FC<{text: string, opt: boolean, link: string}> = ({opt, text, link}) => {
  const heading = "border-[#959595] border-2 font-extrabold text-xl text-[#414141] group cursor-pointer";
  const title = "p-1 bg-white w-[0%] group-hover:bg-[#FFB17E] group-hover:w-[100%] transition-all ease-in-out";

  return (
    <div className={heading} style={{borderTop: opt ? "0" : "", borderBottom: "0", borderLeft: "0", borderRight: "0", marginBottom: "0.2rem", paddingTop: "0.4rem"}}><a href={`#${link}`}>{text}</a>
      <div className={title}></div>
    </div>
  );
}

const Options: FC = () => {
  const headings = ["About Me", "Contact Me", "Skills", "Portfolio"];
  const links = ["about", "contact", "skills", "portfolio"]
  
  return (
    <div className={`flex flex-col w-[100%] items-center md:items-start justify-center md:justify-start align-middle transition-all ease-in-out`}>
      {headings.map((e,index) => (
        <Heading opt={index===0} text={e} link={links[index]}/>
      ))}
    </div>
  );
};

export default Options;
