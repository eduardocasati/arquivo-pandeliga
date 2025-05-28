// import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Countdown } from './Countdown/Countdown';

export const Home = () => {
  // const [latestChampion, setLatestChampion] = useState(null);

  // useEffect(() => {
  //  getChampionTeamName().then(setLatestChampion);
  // }, []);

  return (
    <div>
      <Header />
      <div>
        <Countdown />
      </div>
      {/* <h3>{latestChampion}</h3> */}
    </div>
  );
};

export default Home;
