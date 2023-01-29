import { FC, useState, useEffect } from 'react';


const Blob: FC<{heading: string, x: number, y: number, h: number, source: any, v: number}> = ({heading,x,y,h,source,v}) => {
  // current x and y
  const [cx, scx] = useState(x);
  const [cy, scy] = useState(y);
  const [width, setWidth] = useState(h);

  useEffect(() =>  {
    const handleMouseMove = (e: MouseEvent): void => {
      let mx = (e.clientX);
      let my = (e.clientY);
      setWidth(width + 3*(Math.random()-0.5));

      let unitX = (mx-cx);
      let unitY = (my-cy);
      let mag = (((unitX**2) + (unitY**2))**0.5) || (1);
      unitX /= mag;
      unitY /= mag;
      unitX *= v;
      unitY *= v;

      if(Math.abs(unitX) > 1 || Math.abs(unitY) > 1) {
        scx(cx + unitX);
        scy(cy + unitY);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
  });

  return (
    <a href={heading === "Portfolio" ? "/#portfolio" : "/"}><div className="absolute flex justify-center items-center cursor-pointer" style={{left: `${cx-width/2}px`, top: `${cy-width/2}px`}}>
      <img src={source} alt="Blob" width={width} style={{opacity: "100%"}}/>
      <h1 className={`absolute p-4 font-black text-white text-3xl whitespace-nowrap`}>{heading}</h1>
    </div></a>
  );
};

export default Blob;
