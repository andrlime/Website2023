import { FC } from 'react';

const Header: FC = () => {
  return (
    <div className={`flex w-[100%] justify-center md:justify-start align-middle transition-all ease-in-out`}>
      <div id="header" className="bg-[#FFB17E] p-4 text-5xl text-white transition-all ease-in-out cursor-default select-none font-black whitespace-nowrap">
        Andrew Li
      </div>
      <div className="absolute bottom-2 left-[50%] text-xl font-black">&uarr;</div>
    </div>
  );
};

export default Header;
