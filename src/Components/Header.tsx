import { FC } from 'react';
import { useWindowScroll } from '@mantine/hooks';
import AboutContent from './AboutContent';
import Content from './Content';

export const HEADER_ITEMS = [
  {label: "About", to: "about", component: AboutContent, endpoint: ""},
  {label: "Coding Projects", to: "code", component: Content, endpoint: "https://orca-app-4rvgg.ondigitalocean.app/api/projects"},
  {label: "Graphic Design", to: "gd", component: Content, endpoint: "https://orca-app-4rvgg.ondigitalocean.app/api/gd"},
  {label: "Gizmos", to: "gizmos", component: Content, endpoint: "https://orca-app-4rvgg.ondigitalocean.app/api/gizmos"},
];

const Header: FC = () => {
  const scroll = useWindowScroll()[0];

  const extrapolateColor = (positionY: number, baseY: number, maxY: number): [string, string] => {
    const BASE_RED = 78;
    const BASE_GREEN = 42;
    const BASE_BLUE = 132;
    const TARGET_RED = 255;
    const TARGET_GREEN = 255;
    const TARGET_BLUE = 255;

    let POSITION = (positionY-baseY)/(maxY-baseY);
    POSITION = POSITION > 1 ? 1 : POSITION < 0 ? 0 : POSITION;

    const RED = POSITION*(TARGET_RED-BASE_RED) + BASE_RED;
    const GREEN = POSITION*(TARGET_GREEN-BASE_GREEN) + BASE_GREEN;
    const BLUE = POSITION*(TARGET_BLUE-BASE_BLUE) + BASE_BLUE;
    const ALPHA = 1-POSITION;

    const OUTPUT1 = "#" +
    (Math.round(RED)).toString(16).padStart(2, "0") +
    (Math.round(GREEN)).toString(16).padStart(2, "0") +
    (Math.round(BLUE)).toString(16).padStart(2, "0");

    const OUTPUT2 = "#" +
    (Math.round(ALPHA)*255).toString(16).padStart(2, "0") +
    (Math.round(ALPHA)*255).toString(16).padStart(2, "0") +
    (Math.round(ALPHA)*255).toString(16).padStart(2, "0");

    return [OUTPUT1, OUTPUT2];
  };
  
  //const COLOR = "#4E2A84";
  const SCROLL_MAX = 300;
  const COLORS = extrapolateColor(scroll.y, 0, SCROLL_MAX);
  const PURPLE_COLOR = "text-[#B6ACD1]";

  console.log(COLORS);

  return (
    <div id="h-header" style={{backgroundColor: COLORS[0]}} className={`sticky top-0 flex flex-col md:flex-row md:items-center w-full justify-between md:justify-between align-middle transition-all ease-in-out px-5 py-2 ${scroll.y > SCROLL_MAX ? "border-gray-100 border-b-2" : ""} z-10`}>
      <div id="h-logo" className={`w-fit text-2xl transition-all ease-in-out cursor-default select-none font-black whitespace-nowrap ${PURPLE_COLOR} transition-all ease-in-out hover:cursor-pointer hover:text-white`}>
        Andrew Li
      </div>
      <div id="h-nav" className="hidden md:flex flex-col md:flex-row w-full max-w-[600px] justify-between text-md font-black transition-all">
        {HEADER_ITEMS.map((e,i) => (
          <a style={{color: COLORS[1]}} href={`#${e.to}`}><div className={`whitespace-nowrap uppercase hover:text-[#B6ACD1] transition-all`}>{e.label}</div></a>
        ))}
      </div>
    </div>
  );
};

export default Header;
