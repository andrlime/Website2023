import { FC } from 'react';
import Header from './Components/Header';
import Blob from './Components/Blob';
import Options from './Components/Options';
import Content from './Components/Content';

import BlobSource from './Blob2.svg';
import BlobSource2 from './Blob3.svg';
import BlobSource3 from './Blob1.svg';

const App: FC = () => {
  return (
    <div>
      <div className="bg-white h-[100vh] flex p-3 flex-col align-middle justify-center">
        <Blob heading={""} source={BlobSource2} x={900} y={230} h={450} v={0}/>
        <Blob heading={""} source={BlobSource3} x={700} y={650} h={350} v={0}/>
        <Blob heading={"Portfolio"} source={BlobSource} x={150} y={150} h={250} v={2.3}/>
        <Header/>
        <Options/>
      </div>
      <Content/>
    </div>
  );
};

export default App;
