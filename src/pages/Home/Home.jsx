import { useEffect, useState } from 'react';
import { getChampionTeamName } from '../../services/leagueChampion';
import { Countdown } from './Countdown/Countdown';

export const Home = () => {
  const [latestChampion, setLatestChampion] = useState(null);

  useEffect(() => {
    getChampionTeamName().then(setLatestChampion);
  }, []);

  return (
    <div>
      <div>
        <Countdown />
      </div>
      <p>{latestChampion}</p>
    </div>
  );
};

export default Home;
