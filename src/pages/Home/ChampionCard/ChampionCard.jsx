import { useChampionTeamInfo } from './useChampionTeamInfo';

import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

import './ChampionCard.css';

export const ChampionCard = () => {
  const { teamInfo, isLoading } = useChampionTeamInfo();

  if (isLoading || !teamInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="champion-card">
      <div className="champion-card__champion-logo">
        <img src={teamInfo.team_logo} alt={`${teamInfo.team_name} Logo`} />
      </div>
    </div>
  );
};
