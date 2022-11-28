/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Q.module.css';
import axios from 'axios';

const Skills: FunctionComponent = () => {
  type SkillSet = {
    label: string,
    skills: Array<string>
  }

  let langs: Array<SkillSet> = [
    {label: "Programming Languages and Frameworks", skills: ["Julia", "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express", "Python",
    "Racket", "Sass", "Jupyter", "FFmpeg", "TensorFlow"]},
    {label: "Graphical Skills", skills: ["Adobe Photoshop", "Adobe InDesign", "Adobe Illustrator", "Canva"]},
    {label: "Other Technical Skills", skills: ["DigitalOcean", "Git", "MongoDB"]}
  ]

  return (
    <div style={{width: "75%"}}>
    {langs.map((i: any, num: number) => (
      <div key={num*12367} className={styles.skillsBox}>
        <div className={styles.skillsLeft}>
          {i.label}:
        </div>
        <div className={styles.skillsRight}>
        {i.skills.map((j: any, index: number) => (
          <img key={index*42323} style={{padding: "0.1rem"}} alt={j} src={`https://img.shields.io/static/v1?label=&message=${j.charAt(0).toUpperCase() + j.slice(1)}&style=flat&logo=${j}&labelColor=cbcbcb`}/>
        )
        )}
        </div>
      </div>
    ))}
    <p style={{margin: "0"}}>For a full list, see my resumé</p>
    </div>
  );
}

const Card: FunctionComponent<{ title: string, link: string, description: string, languageId: string, imageUrl?: string }> = ({title, link, description, languageId, imageUrl}) => {
  let languageIdList: string[] = languageId.match(/[\w-.][^\s,]*/g) || [""];
  return (
    <div className={styles.card}>
      <div><span className={styles.title}>{title}</span></div>
      
      <div className={styles.lang}>
        {languageIdList.map((element: string, index: number) => (
          <img style={{padding: "0.1rem"}} alt={element} key={index} src={`https://img.shields.io/static/v1?label=&message=${element.charAt(0).toUpperCase() + element.slice(1)}&style=flat&logo=${element}&labelColor=cbcbcb`}/>
        ))}
        {link!="none" ? <a href={link} style={{padding: "0.1rem"}}><span className={styles.link}><img src="/link.svg" alt={"link button"} width="18"/></span></a> : <></>}
      </div>
      
      <div className={styles.imageFrame} style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "left", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

const Paragraph: FunctionComponent<{ title: string, id: string, description: string }> = ({title, id, description}) => {
  return (
    <div className={styles.paragraph}>
      <div className={styles.title} id={id}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

const ContactBar: FunctionComponent = () => (<div style={{marginBottom: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
<a href="https://github.com/andrlime"><img src="/github.svg" alt="github" style={{margin: "0.2rem"}} width={30}/></a>
<a href="mailto:anli@u.northwestern.edu"><img src="/mail.svg" alt="email" style={{margin: "0.2rem"}} width={30}/></a>
<a href="https://www.linkedin.com/in/andrew-li-41778a223/"><img src="/linkedin.svg" alt="linkedin" style={{margin: "0.2rem"}} width={30}/></a>
</div>)

const Home: NextPage = () => {
  const [loadedProj, setLoadedProj] = useState(false);
  const [loadedPara, setLoadedPara] = useState(false);
  const [filter, setFilter] = useState("");
  const paragraphs = useRef([]);
  const projects = useRef([]);
  const languageList = useRef<string[]>([]);

  useEffect(() => {
    // get paragraphs content from api route
    axios
    .get("api/paragraphs")
    .then((res) => {
        if(res.data !== null) {
        setLoadedPara(true);

        let content = res.data;
        // set content that requires react components
        content[1].content = (<>I have two resumés: <b><a href="/stem.pdf">STEM and CS</a></b> and <b><a href="/hum.pdf">Humanities</a></b></>);
        content[2].content = (<Skills/>)

        paragraphs.current = (res.data);
        }
    });

    let temp: any[] = [];
    let languagesList: string[] = [];

    // get projects from api route
    axios
    .get("api/projects")
    .then((res) => {
        if(res.data !== null) {
          setLoadedProj(true);
          temp = res.data;
          projects.current = (res.data);
        }

        for (const key of temp) {
          languagesList = languagesList.concat(key.mainLanguage.match(/[\w-.][^\s,]*/g));
        }
        languageList.current = ([... new Set(languagesList)]);
    });
  }, []);

  return (
    <div className={styles.everything}>
      <Head>
        <title>Andrew Li</title>
        <link rel="icon" type="image/x-icon" href="/icon.png"/>
      </Head>
      <div className={styles.container}>
          <div className={styles.contentLeft}></div>
          <div className={styles.contentRight}>
            <div className={styles.name}>Andrew Li</div>
            <div className={styles.emoji}>👋</div>
          </div>
      </div>
      
      <div className={styles.content}>

        <div className={styles.contentLeft}>
          {loadedPara ? paragraphs.current.map((i: any, index: number) => (
            <div key={index*115323} className={styles.item}><a href={`#${i.htmlid}`}>{i.title}</a></div>
          )) : "Loading..."}
          <div className={styles.item}><a href={`#projects`}>Personal Projects</a></div>
          <ContactBar/>
        </div>

        <div className={styles.contentRight}>
          {loadedPara ? paragraphs.current.map((i: any, index: number) => (
            <Paragraph key={index*100} id={i.htmlid} title={i.title} description={i.content}/>
          )) : "Loading..."}
          
          <div className={styles.paragraph}>
            <div className={styles.bigtitle} id={"projects"}>Personal Projects</div>
            <div>Filter by language:</div>
            <div className={styles.contentWide} id={styles.filters}>
              <img onClick={(e: any) => {
                setFilter("");
              }} style={{padding: "0.1rem", backgroundColor: filter=="" ? "#1b1717" : ""}} alt={"reset filter"} key={-1982} src={`https://img.shields.io/badge/-Reset-1b1717`}/>
            {languageList.current.map((element: string, index: number) => (
              <img onClick={(e: any) => {
                let t = e.target;
                setFilter(t.alt);
              }} style={{padding: "0.1rem", backgroundColor: filter==element ? "#1b1717" : ""}} alt={element} key={element} src={`https://img.shields.io/static/v1?label=&message=${element.charAt(0).toUpperCase() + element.slice(1)}&style=flat&logo=${element}&labelColor=cbcbcb`}/>
            ))}
            </div>
          </div>

          {loadedProj ? (projects.current.filter((e: any) => e.mainLanguage.includes(filter))).map((i: any, index: number) => (
            <Card key={index*1000} title={i.title} link={i.link} description={i.content} languageId={i.mainLanguage} imageUrl={i.imageUrl}/>
          )) : "Loading..."}
        </div>
      
      </div>

      <ContactBar/>
    </div>
  );
};

export default Home;