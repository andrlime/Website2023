import { FC } from 'react';
import PortfolioCard from './PortfolioCard';
import Skills from './Skills';

const Content: FC = () => {
  const HEADING_STYLE = "text-xl font-black text-[#414141]";

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
      <PortfolioCard title={"text"} description={"test test test"} link={"https://www.google.com"} image={"https://v5.airtableusercontent.com/v1/14/14/1674986400000/rUAtluZg8xxrd2XA961njg/M9j_s4wIYeoax91j78oCzNRQfcWzU6kH7tDqt2wr_bF-sOSkAhvPXQWeoH8lhe4VH4gdJmjdlXAgsWJr3N4EPQ/C3Mo3nJcLdbPWJRa1A7nJg6F2JXEXZzdC4u_5WHUFfc"} index={1}/>
      <PortfolioCard title={"text"} description={"test test test"} link={"https://www.google.com"} image={"https://v5.airtableusercontent.com/v1/14/14/1674986400000/rUAtluZg8xxrd2XA961njg/M9j_s4wIYeoax91j78oCzNRQfcWzU6kH7tDqt2wr_bF-sOSkAhvPXQWeoH8lhe4VH4gdJmjdlXAgsWJr3N4EPQ/C3Mo3nJcLdbPWJRa1A7nJg6F2JXEXZzdC4u_5WHUFfc"} index={2}/>
      <PortfolioCard title={"text"} description={"test test test"} link={"https://www.google.com"} image={"https://v5.airtableusercontent.com/v1/14/14/1674986400000/rUAtluZg8xxrd2XA961njg/M9j_s4wIYeoax91j78oCzNRQfcWzU6kH7tDqt2wr_bF-sOSkAhvPXQWeoH8lhe4VH4gdJmjdlXAgsWJr3N4EPQ/C3Mo3nJcLdbPWJRa1A7nJg6F2JXEXZzdC4u_5WHUFfc"} index={3}/>

    </div>
  );
};

export default Content;
