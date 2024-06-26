import { MantineProvider } from '@mantine/core';
import React, { useEffect } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HeadingPhoto from './Components/HeadingPhoto';
import { Section } from './Components/Section';
import { HEADER_ITEMS } from './Components/Header';

export const App: React.FC = () => {
  useEffect(() => {
    window.location.assign("https://www.linkedin.com/in/andrewli2048/");
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header/>
      <HeadingPhoto/>

        {HEADER_ITEMS.map((e,index) => (
        <Section alignLeft={index % 2 === 0} name={e.label} id={e.to}>
          <e.component index={index} endpoint={e.endpoint}/>
        </Section>
        ))}
      <Footer/>
    </MantineProvider>
  );
}

export default App;
