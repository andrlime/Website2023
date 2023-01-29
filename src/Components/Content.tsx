import { FC, useEffect, useState } from 'react';
import PortfolioCard from './PortfolioCard';
import Skills from './Skills';
import axios from 'axios';

type Project = {
  title: string;
  content: string;
  link?: string;
  Attachments: Array<Attachment>,
  mainLanguage: string
}

type Attachment = {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: {
    full: {
      url: string;
      width: number;
      height: number;
    };
    large: {
      url: string;
      width: number;
      height: number;
    };
    small: {
      url: string;
      width: number;
      height: number;
    };
  };
  type: string;
  url: string;
  width: number;
};

const Content: FC = () => {
  const HEADING_STYLE = "text-xl font-black text-[#414141]";

  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
axios.get("https://orca-app-4rvgg.ondigitalocean.app/website2023-srv/projects").then((res) 
=> {
      setProjects(res.data);
      console.log(res.data);
      setLoaded(true);
    })
  },[]);

  return (
    <div className="p-4 bg-white flex flex-col md:w-3/4 float-right z-30 m-8">

      <div id="about" className={HEADING_STYLE}>About Me</div>
      <div>Hello! I'm Andrew (they/them), and I study integrated sciences, math, and computer science at Northwestern University. My interests are in machine learning and software development, and I also enjoy writing code for STEM research. I'm well-versed in both STEM and humanities fields, though I want to pursue a career in computer science.</div>
      <div id="contact" className={HEADING_STYLE}>Contact Me</div>
      <div>
        <div><span className='font-bold'>Email:</span> <a href="mailto:andrewli@u.northwestern.edu" className="hover:underline">andrewli@u.northwestern.edu</a></div>
        <div><span className='font-bold'>GitHub:</span> <a href="https://github.com/andrlime" className="hover:underline">@andrlime</a></div>
        <div><span className='font-bold'>LinkedIn:</span> <a href="https://www.linkedin.com/in/andrewli2048/" className="hover:underline">andrewli2048</a></div>
      </div>
      <div id="skills" className={HEADING_STYLE}>Skills</div>
      <Skills/>

      <div id="portfolio" className={HEADING_STYLE}>Portfolio</div>
      {!loaded ? <div>Loading...</div> : projects.map((e,i) => (
        <PortfolioCard languages={e.mainLanguage} key={i+e.title} title={e.title} description={e.content} link={e.link || ""} image={e.Attachments[0].url} index={i+1}/>
      ))}
    </div>
  );
};

export default Content;
