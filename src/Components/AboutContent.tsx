import { FC } from 'react';

const AboutContent: FC<{index: number, endpoint: string}> = ({index, endpoint}) => {
  return (
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: index % 2 === 0 ? "flex-start" : "flex-end"}}>
      <div>Hello! I'm Andrew (they/them), and I study integrated sciences, math, and computer science at Northwestern University. My interests are in machine learning and software development, and I also enjoy writing code for STEM research. I'm well-versed in both STEM and humanities fields, and I want to pursue a career in computer science.</div>
    </div>
  );
};

export default AboutContent;
