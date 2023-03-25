import React, { ReactNode } from 'react';

export const Section: React.FC<{alignLeft?: boolean, children: ReactNode, name?: string, id: string}> = ({name = 'Section', alignLeft = false, children, id}) => {
  const GenericGridRow: React.FC<{numberOfCols: number, floatLeft: boolean, buffer: number, span: number, children: React.ReactNode}> = ({numberOfCols, floatLeft, buffer, span, children}) => {
    if(buffer + span > numberOfCols) {
      throw Error("buffer and span props must sum to less than total columns");
    }
  
    if(floatLeft) {
      return (
        <>
          {[...Array(buffer).keys()].map((_, index) => (
            <div key={`BUFFER ${index} ${Math.random()}`}></div>
          ))}
          <div style={{gridColumn: `span ${span} / span ${span}`}}>{children}</div>
          {[...Array(numberOfCols - buffer - span).keys()].map((_, index) => (
            <div key={`BUFFER ${index} ${Math.random()}`}></div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {[...Array(numberOfCols - buffer - span).keys()].map((_, index) => (
            <div key={`BUFFER ${index} ${Math.random()}`}></div>
          ))}
          <div style={{gridColumn: `span ${span} / span ${span}`}}>{children}</div>
          {[...Array(buffer).keys()].map((_, index) => (
            <div key={`BUFFER ${index} ${Math.random()}`}></div>
          ))}
        </>
      );
    }
  };

  return (
    <div id={id}><div className='p-12 grid md:grid-cols-7 w-full'>
        <GenericGridRow numberOfCols={7} floatLeft={alignLeft} buffer={1} span={3}>
            <div className={`text-4xl md:text-6xl font-black ${alignLeft ? "text-left" : "text-right"} mb-2`}>{name}</div>
        </GenericGridRow>
        <GenericGridRow numberOfCols={7} floatLeft={alignLeft} buffer={1} span={5}>
            <div className={`text-${alignLeft ? "left" : "right"}`}>{children}</div>
        </GenericGridRow>
        </div>
        <div className='w-full p-[1.5px] bg-gray-100'></div>
    </div>
  );
}

export default Section;
