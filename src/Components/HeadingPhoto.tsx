import { FC } from 'react';
import Tree from '../Static/Tree.jpg';

const HeadingPhoto: FC = () => {
  return (
    <div style={{backgroundImage: `url(${Tree})`, height: "50vh", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "top right", backgroundColor: "#836EAA", minHeight: "650px"}}/>
  );
};

export default HeadingPhoto;
