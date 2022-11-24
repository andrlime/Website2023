/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Q.module.css';
import axios from 'axios';

const Skills: FunctionComponent = () => {
  let languages = ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express.js", "Python",
    "Racket", "Sass", "Julia", "Adobe Photoshop", "Adobe InDesign", "Adobe Illustrator", "Canva", "DigitalOcean", "Git", "MongoDB"];
  return (
    <div style={{width: "75%"}}>
    {languages.map((i: any, index: number) => (
      <img style={{padding: "0.1rem"}} src={`https://img.shields.io/static/v1?label=&message=${i.charAt(0).toUpperCase() + i.slice(1)}&style=flat&logo=${i}&labelColor=cbcbcb`}/>
    ))}
    <p style={{margin: "0"}}>For a full list, see my resumé</p>
    </div>
  );
}

const Card: FunctionComponent<{ title: string, link: string, description: string, languageId: string, imageUrl?: string }> = ({title, link, description, languageId, imageUrl}) => {
  return (
    <div className={styles.card}>
      <div><span className={styles.title}>{title}</span>&nbsp;{link!="none" ? <a href={link}><span className={styles.link} style={{padding: "0.5rem", display: "inline-block", borderRadius: "5rem", lineHeight: "0"}}><img src="/link.png" width="15"/></span></a> : <></>} </div>
      <div className={styles.lang}><img src={`https://img.shields.io/static/v1?label=&message=${languageId.charAt(0).toUpperCase() + languageId.slice(1)}&style=flat&logo=${languageId}&labelColor=cbcbcb`}/></div>
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

const Home: NextPage = () => {
  const [loadedPara, setLoadedPara] = useState(false);
  const [loadedProj, setLoadedProj] = useState(false);
  const [paragraphs, setParagraphs] = useState<Array<{ title: string, description: string }>>([]);
  const [projects, setProjects] = useState<Array<{ title: string, link: string, description: string, imageUrl?: string }>>([])

  useEffect(() => {
    axios
    .get("api/paragraphs")
    .then((res) => {
        if(res.data !== null) {
        setLoadedPara(true);

        let content = res.data;
        // set resume
        content[1].content = (<>I have two resumés: <b><a href="/stem.pdf">STEM and CS</a></b> and <b><a href="/hum.pdf">Humanities</a></b></>);
        content[2].content = (<Skills/>)

        setParagraphs(res.data);
        }
    });

    axios
    .get("api/projects")
    .then((res) => {
        if(res.data !== null) {
        setLoadedProj(true);
        setProjects(res.data);
        }
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
          {loadedPara ? paragraphs.map((i: any) => (
            <div className={styles.item}><a href={`#${i.htmlid}`}>{i.title}</a></div>
          )) : "Loading..."}
          <div className={styles.item}><a href={`#projects`}>Personal Projects</a></div>
          <div>
            <a href="https://github.com/andrlime"><img src="/github.svg" style={{margin: "0.2rem"}} width={30}/></a>
            <a href="mailto:anli@u.northwestern.edu"><img src="/mail.svg" style={{margin: "0.2rem"}} width={30}/></a>
            <a href="https://www.linkedin.com/in/andrew-li-41778a223/"><img src="/linkedin.svg" style={{margin: "0.2rem"}} width={30}/></a>
          </div>
        </div>
        <div className={styles.contentRight}>
          {loadedPara ? paragraphs.map((i: any, index: number) => (
            <Paragraph key={index*100} id={i.htmlid} title={i.title} description={i.content}/>
          )) : "Loading..."}
          <div className={styles.paragraph}>
            <div className={styles.bigtitle} id={"projects"}>Personal Projects</div>
          </div>
          {loadedProj ? projects.map((i: any, index: number) => (
            <Card key={index*1000} title={i.title} link={i.link} description={i.content} languageId={i.mainLanguage} imageUrl={i.imageUrl}/>
          )) : "Loading..."}
        </div>
      </div>
      <div style={{marginBottom: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <a href="https://github.com/andrlime"><img src="/github.svg" style={{margin: "0.2rem"}} width={30}/></a>
        <a href="mailto:anli@u.northwestern.edu"><img src="/mail.svg" style={{margin: "0.2rem"}} width={30}/></a>
        <a href="https://www.linkedin.com/in/andrew-li-41778a223/"><img src="/linkedin.svg" style={{margin: "0.2rem"}} width={30}/></a>
      </div>
    </div>
  );
};

export default Home;