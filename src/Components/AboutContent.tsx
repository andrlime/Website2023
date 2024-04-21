import { FC } from 'react';

const AboutContent: FC<{index: number, endpoint: string}> = ({index, endpoint}) => {
  return (
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: index % 2 === 0 ? "flex-start" : "flex-end"}}>
      <div>I'm Andrew Li, and I major in <a href="https://isp.northwestern.edu/">Integrated Sciences</a>, Computer Science, and Chemistry at Northwestern University.</div>
    </div>
  );
};

export default AboutContent;
