/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Q.module.css';
import axios from 'axios';

const Card: FunctionComponent<{ title: string, link: string, description: string, languageId: string, imageUrl?: string }> = ({title, link, description, languageId, imageUrl}) => {
  return (
    <div className={styles.card}>
      <div><span className={styles.title}>{title}</span>&nbsp;{link!="none" ? <span className={styles.link} style={{padding: "0.5rem", display: "inline-block", borderRadius: "5rem", lineHeight: "0"}}><a href={link}><img src="/link.png" width="15"/></a></span> : <></>} </div>
      <div className={styles.lang}><img src={`https://img.shields.io/static/v1?label=&message=${languageId.charAt(0).toUpperCase() + languageId.slice(1)}&style=flat&logo=${languageId}&labelColor=cbcbcb`}/></div>
      <div className={styles.imageFrame} style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "left", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}></div>
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
        </div>
        <div className={styles.contentRight}>
          {loadedPara ? paragraphs.map((i: any) => (
            <Paragraph key={i} id={i.htmlid} title={i.title} description={i.content}/>
          )) : "Loading..."}
          {loadedProj ? projects.map((i: any) => (
            <Card key={i} title={i.title} link={i.link} description={i.content} languageId={i.mainLanguage} imageUrl={i.imageUrl}/>
          )) : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Home;