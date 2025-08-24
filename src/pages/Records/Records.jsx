import { Header, LoadingSpinner } from '../../components';

import './Records.css';

import { formatToBRDecimal } from '../../utils/formatters/numberFormat';
import { useRecords } from './useRecords';

import teams from '../../constants/teams';

export const Records = () => {
  const { records, isLoading } = useRecords();

  console.log(records);

  const findTeamName = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_name;
  };

  const findTeamDisplayName = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).display_name;
  };

  const findTeamLogo = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_logo;
  };

  const findTeamId = (rosterId) => {
    return teams.find((team) => team.roster_id === rosterId).team_id;
  };

  return (
    <>
      <Header />
      {isLoading || !records ? (
        <div className="loading-spinner--local">
          <LoadingSpinner />
          <p className="loading-spinner__message">Carregando recordes</p>
        </div>
      ) : (
        <div className="records-page">
          <div className="records-page__header">
            <h1>Recordes</h1>
          </div>

          <div className="records-page__content">
            <div className="record-section">
              <div className="record-section__header">
                <h2>Maiores Pontuações</h2>
              </div>
              <ol className="record-section__body">
                {records.top_10_scores.map((score, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(score.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(score.roster_id)}
                        alt={`${findTeamName(score.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(score.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(score.points)}</h3>
                      <small>
                        vs. {findTeamName(score.opponent_id)}, {score.season} -
                        semana {score.week}
                      </small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Menores Pontuações</h2>
              </div>
              <ol className="record-section__body">
                {records.low_10_scores.map((score, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(score.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(score.roster_id)}
                        alt={`${findTeamName(score.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(score.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(score.points)}</h3>
                      <small>
                        vs. {findTeamName(score.opponent_id)}, {score.season} -
                        semana {score.week}
                      </small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Maiores Pontos a Favor*</h2>
              </div>
              <ol className="record-section__body">
                {records.top_10_season_points.map((team, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(team.roster_id)}
                        alt={`${findTeamName(team.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(team.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(team.points)}</h3>
                      <small>{team.season}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Menores Pontos a Favor*</h2>
              </div>
              <ol className="record-section__body">
                {records.low_10_season_points.map((team, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(team.roster_id)}
                        alt={`${findTeamName(team.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(team.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(team.points)}</h3>
                      <small>{team.season}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Melhores Temporadas*</h2>
              </div>
              <ol className="record-section__body">
                {records.top_10_season_wins.map((team, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(team.roster_id)}
                        alt={`${findTeamName(team.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(team.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{team.record}</h3>
                      <small>{team.season}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Piores Temporadas*</h2>
              </div>
              <ol className="record-section__body">
                {records.low_10_season_wins.map((team, index) => (
                  <li key={index} className="record-section__row">
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <img
                        src={findTeamLogo(team.roster_id)}
                        alt={`${findTeamName(team.roster_id)} Logo`}
                      />
                      <h3>{findTeamName(team.roster_id)}</h3>
                    </div>
                    <div className="record-section__value">
                      <h3>{team.record}</h3>
                      <small>{team.season}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Maiores Surras</h2>
              </div>
              <ol className="record-section__body">
                {records.top_10_victories.map((victory, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--matchup"
                  >
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <div className="record-section__matchup">
                        <div className="matchup__team matchup__team--winner">
                          <img
                            src={findTeamLogo(victory.winner_id)}
                            alt={`${findTeamName(victory.winner_id)} Logo`}
                          />
                          <h3>{findTeamDisplayName(victory.winner_id)}</h3>
                          <h4>{formatToBRDecimal(victory.winner_points)}</h4>
                        </div>
                        <p>vs.</p>
                        <div className="matchup__team matchup__team--loser">
                          <img
                            src={findTeamLogo(victory.loser_id)}
                            alt={`${findTeamName(victory.loser_id)} Logo`}
                          />
                          <h3>{findTeamDisplayName(victory.loser_id)}</h3>
                          <h4>{formatToBRDecimal(victory.loser_points)}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(victory.margin)}%</h3>
                      <small>
                        {victory.season} -semana {victory.week}
                      </small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-section">
              <div className="record-section__header">
                <h2>Vitórias Mais Apertadas</h2>
              </div>
              <ol className="record-section__body">
                {records.low_10_victories.map((victory, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--matchup"
                  >
                    <div
                      className="record-section__label"
                      // style={{
                      //   '--team-color': `var(--team-${findTeamId(team.roster_id)})`,
                      // }}
                    >
                      <span>{index + 1}.</span>
                      <div className="record-section__matchup">
                        <div className="matchup__team matchup__team--winner">
                          <img
                            src={findTeamLogo(victory.winner_id)}
                            alt={`${findTeamName(victory.winner_id)} Logo`}
                          />
                          <h3>{findTeamDisplayName(victory.winner_id)}</h3>
                          <h4>{formatToBRDecimal(victory.winner_points)}</h4>
                        </div>
                        <p>vs.</p>
                        <div className="matchup__team matchup__team--loser">
                          <img
                            src={findTeamLogo(victory.loser_id)}
                            alt={`${findTeamName(victory.loser_id)} Logo`}
                          />
                          <h3>{findTeamDisplayName(victory.loser_id)}</h3>
                          <h4>{formatToBRDecimal(victory.loser_points)}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="record-section__value">
                      <h3>{formatToBRDecimal(victory.margin)}%</h3>
                      <small>
                        {victory.season} -semana {victory.week}
                      </small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <small className="records-page__regular-season-obs">
              * Inclui apenas temporadas regulares
            </small>
          </div>
        </div>
      )}
    </>
  );
};
