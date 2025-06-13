import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';

import './ChampionCard.css';

import { useChampionData } from '../../../hooks/useChampionData';

export const ChampionCard = () => {
  const { championData, isLoading } = useChampionData();

  // TODO: Adicionar a lógica que pega os stats do campeão de forma dinâmica
  return (
    <div className="champion-card">
      {isLoading || !championData ? (
        <LoadingSpinner />
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
            <div className="stats-regular">
              <h4>TEMP REGULAR</h4>
              {/* TODO: pegar o recorde de forma dinâmica com matchupService */}
              <p>
                V-D <span>10-4</span>
              </p>
              <p>
                PF <span>{championData.regular_season_total_points}</span>
              </p>
              <p>
                PPJ <span>137,85</span>
              </p>
              {/* TODO: pegar o total de roster moves de um time na temporada no endpoint https://api.sleeper.app/v1/league/<league_id>/transactions/<round> */}
              {/* <p>
                Roster Moves <span>16</span>
              </p> */}
            </div>
            <div className="stats-playoffs">
              <h4>PLAYOFFS</h4>
              <p>
                Bye <span>{championData.bye_week ? 'Sim' : 'Não'}</span>
              </p>
              <p>
                PF <span>{championData.playoffs_total_points}</span>
              </p>
              <p>
                PPJ <span>158,14</span>
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
