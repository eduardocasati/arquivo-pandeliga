import { Header } from '../../components';

import { LoadingSpinner } from '../../components';

import './Champions.css';

import { useChampionsList } from './useChampionsList';

import teams from '../../constants/teams';

export const Champions = () => {
  const { championsList, isLoading } = useChampionsList();

  const findTeamName = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_name;
  };

  const findTeamId = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_id;
  };

  const findTeamLogo = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_logo;
  };

  return (
    <>
      <Header />
      {isLoading || !championsList ? (
        <div className="loading-spinner--local">
          <LoadingSpinner />
          <p className="loading-spinner__message">
            Carregando lista de campeões
          </p>
        </div>
      ) : (
        <div className="champions-page">
          <div className="champions-page__header">
            <h1>Campeões 🏆</h1>
          </div>

          <div className="champions-list">
            {Object.entries(championsList)
              .reverse()
              .map(([year, champion]) => (
                <div
                  key={year}
                  className="champion-list-card"
                  style={{
                    '--team-color': `var(--team-${findTeamId(champion.roster_id)})`,
                  }}
                >
                  <div className="champion-list-card__header">
                    <h2>{year}</h2>
                  </div>
                  <div className="champion-list-card__body">
                    <img
                      src={findTeamLogo(champion.roster_id)}
                      alt={`${findTeamName(champion.roster_id)} Logo`}
                    />
                    <h3>{findTeamName(champion.roster_id)}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
