import { FC, useEffect, useState } from 'react';
import PortfolioCard from './PortfolioCard';
import axios from 'axios';

type Project = {
  title: string;
  content: string;
  link?: string;
  Attachments: Array<Attachment>,
  mainLanguage: string,
  year: number
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

const Content: FC<{index: number, endpoint: string}> = ({index, endpoint}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(endpoint).then((res) => {
      setProjects(res.data);
      console.log(res.data);
      setLoaded(true);
    })
  },[endpoint]);

  return (
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: index % 2 === 0 ? "flex-start" : "flex-end"}}>
      {!loaded ? <div>Loading...</div> : projects.sort((a,b) => b.year - a.year).map((e,i) => (
        <PortfolioCard year={e.year + "" || "2023"} languages={e.mainLanguage.split(', ')} title={e.title} description={e.content} link={e.link || ""} image={e.Attachments[0].url}/>
      ))}
    </div>
  );
};

export default Content;
