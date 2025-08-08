import { LoadingSpinner } from '../../../components';

import './ChampionCard.css';

import { useChampionData } from '../../../hooks/useChampionData';

export const ChampionCard = () => {
  const { championData, isLoading } = useChampionData();

  return (
    <div className="champion-card">
      {isLoading || !championData ? (
        <div className="loading-spinner--fullscreen">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* logo do campeão como imagem de fundo */}
          <img
            className="champion-card__background-logo"
            src={championData.team_logo}
            alt=""
            aria-hidden="true"
          />

          <div className="champion-card__champion-info">
            <h1>Atual Campeão</h1>
            <h2>{championData.team_name}</h2>
            <h3>{championData.user_name}</h3>
          </div>

          <div className="champion-card__champion-stats">
            <div>
              <h4>TEMP REGULAR</h4>
              <p>
                V-D{' '}
                <span>
                  {championData.team_record.wins}-
                  {championData.team_record.losses}
                </span>
              </p>
              <p>
                PF <span>{championData.total_regular_season_points}</span>
              </p>
              <p>
                PPJ <span>{championData.regular_season_ppg}</span>
              </p>
              {/* <p>
                Roster Moves <span>16</span>
              </p> */}
            </div>
            <div>
              <h4>PLAYOFFS</h4>
              <p>
                Bye <span>{championData.had_bye_week ? 'Sim' : 'Não'}</span>
              </p>
              <p>
                PF <span>{championData.total_playoffs_points}</span>
              </p>
              <p>
                PPJ <span>{championData.playoffs_ppg}</span>
              </p>
            </div>
          </div>

          {/* <div className="champion-card__champion-logo">
            <img src={championData.team_logo} alt={`${championData.team_name} Logo`} />
          </div> */}
        </>
      )}
    </div>
  );
};
