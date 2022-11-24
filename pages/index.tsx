/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import styles from '../styles/Q.module.css';

const Card: FunctionComponent<{ title: string, link: string, description: string, imageUrl?: string }> = ({title, link, description, imageUrl}) => {
  return (
    <div className={styles.card}>
      <div><span className={styles.title}>{title}</span>&nbsp;<span className={styles.link}><a href={link}>{link}</a></span></div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

const Paragraph: FunctionComponent<{ title: string, description: string }> = ({title, description}) => {
  return (
    <div className={styles.paragraph}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div className={styles.everything}>
      <Head>
        <title>Andrew Li</title>
        <link rel="icon" type="image/x-icon" href="/icon.png"/>
      </Head>
      <div className={styles.container}>
          <div className={styles.contentRight}>
            <div className={styles.name}>Andrew Li</div>
            <div className={styles.emoji}>👋</div>
          </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.item}>About Me</div>
          <div className={styles.item}>Skills</div>
          <div className={styles.item}>Resumé</div>
          <div className={styles.item}>Personal Projects</div>
        </div>
        <div className={styles.contentRight}>
          <Paragraph title={"About Me"} description={"AAA"}/>
          <Paragraph title={"Skills"} description={"AAA"}/>
          <Paragraph title={"Resumés"} description={"AAA"}/>
          <div className={styles.bigtitle}>Personal Projects</div>
          <Card title={"AAA"} link={"AAA"} description={"AAA"} imageUrl={"AAA"}/>
        </div>
      </div>
    </div>
  );
};

export default Home;