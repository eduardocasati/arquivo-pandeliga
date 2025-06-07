import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

import './ChampionCard.css';

import { useChampionTeamInfo } from '../../../hooks/useChampionTeamInfo';

export const ChampionCard = () => {
  const { teamInfo, isLoading } = useChampionTeamInfo();

  if (isLoading || !teamInfo) {
    return <LoadingSpinner />;
  }

  // TO DO: Adicionar a lógica que pega os stats do campeão de forma dinâmica
  return (
    <div className="champion-card">
      <div className="champion-card__champion-info">
        <h1>Atual Campeão</h1>
        <h2>{teamInfo.team_name}</h2>
        <h3>Krusador</h3>
        <div className="champion-card__champion-stats">
          <div className="stats-regular">
            <h4>TEMP REGULAR</h4>
            <p>
              V-D <span>10-4</span>
            </p>
            <p>
              PF <span>1929,90</span>
            </p>
            <p>
              PPJ <span>137,85</span>
            </p>
            <p>
              Roster Moves <span>16</span>
            </p>
          </div>
          <div className="stats-playoffs">
            <h4>PLAYOFFS</h4>
            <p>
              Bye <span>Sim</span>
            </p>
            <p>
              PF <span>316,28</span>
            </p>
            <p>
              PPJ <span>158,14</span>
            </p>
          </div>
        </div>
      </div>
      <div className="champion-card__champion-logo">
        <img src={teamInfo.team_logo} alt={`${teamInfo.team_name} Logo`} />
      </div>
    </div>
  );
};
