import { Header, LoadingSpinner } from '../../components';

import './Records.css';

import { adjustPositionTop10WithFlex } from '../../utils/adjustHighestPositionsWithFlex';
import { getPlayerImageUrl } from '../../utils/assets/playerImages';
import { mapTeamName } from '../../utils/formatters/nflTeamNameFormat';
import { formatToBRDecimal } from '../../utils/formatters/numberFormat';
import { abbreviateName } from '../../utils/formatters/playerNameFormat';
import { getFromLocalStorage } from '../../utils/localStorage/localStorageUtils';
import { getTop10Players } from './helpers';
import { useRecords } from './useRecords';

import { STORAGE_KEYS } from '../../config/storageKeys';
import teams from '../../constants/teams';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

export const Records = () => {
  const { records, isLoading } = useRecords();

  const allPlayers = getFromLocalStorage(ALL_PLAYERS_DATA);

  // console.log(records);

  const adjustedTop10Positions = records
    ? adjustPositionTop10WithFlex(records)
    : [];

  // console.log(adjustedTop10Positions);

  const top10Players = getTop10Players(adjustedTop10Positions);

  // console.log(top10Players);

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

  const getPlayerName = (playerId) => {
    const player = allPlayers[playerId].full_name;

    return abbreviateName(player);
  };

  const getPlayerPosition = (playerId) => {
    return allPlayers[playerId].position;
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

            {/* PONTUADORES */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>Maiores Pontuadores</h2>
              </div>
              <ol className="record-section__body">
                {top10Players.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div
                            className={`record-section__player-position 
                            ${
                              getPlayerPosition(player.player_id) === 'QB'
                                ? 'quarterback--text'
                                : getPlayerPosition(player.player_id) === 'RB'
                                  ? 'runningback--text'
                                  : getPlayerPosition(player.player_id) === 'WR'
                                    ? 'widereceiver--text'
                                    : getPlayerPosition(player.player_id) ===
                                        'TE'
                                      ? 'tightend--text'
                                      : getPlayerPosition(player.player_id) ===
                                          'K'
                                        ? 'kicker--text'
                                        : getPlayerPosition(
                                              player.player_id,
                                            ) === 'DEF'
                                          ? 'defense--text'
                                          : ''
                            }
                            `}
                          >
                            <p>{getPlayerPosition(player.player_id)}</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* QUARTERBACK */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="quarterback--text">Quarterbacks</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.qb.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position quarterback--text">
                            <p>qb</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* RUNNING BACK */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="runningback--text">Running Backs</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.rb.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position runningback--text">
                            <p>rb</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* WIDE RECEIVER */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="widereceiver--text">Wide Receivers</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.wr.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position widereceiver--text">
                            <p>wr</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* TIGHT END */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="tightend--text">Tight Ends</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.te.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position tightend--text">
                            <p>te</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* KICKER */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="kicker--text">Kickers</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.k.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position kicker--text">
                            <p>k</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{getPlayerName(player.player_id)}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* DEFESA */}
            <div className="record-section">
              <div className="record-section__header">
                <h2>
                  Maiores Pontuadores:{' '}
                  <span className="defense--text">Defesas</span>
                </h2>
              </div>
              <ol className="record-section__body">
                {adjustedTop10Positions.def.map((player, index) => (
                  <li
                    key={index}
                    className="record-section__row record-section__row--player"
                  >
                    <span>{index + 1}.</span>
                    <div className="record-section__player-card">
                      <div className="record-section__player-avatar">
                        <img src={getPlayerImageUrl(player.player_id)} alt="" />
                      </div>
                      <div className="record-section__player-details">
                        <div className="record-section__player-header">
                          <div className="record-section__player-position defense--text">
                            <p>def</p>
                          </div>
                          <div className="record-section__player-name">
                            <h3>{mapTeamName(player.player_id).last_name}</h3>
                          </div>
                        </div>
                        <div className="record-section__player-footer">
                          <div className="record-section__match-details">
                            <p>
                              <strong
                                style={{
                                  '--team-color': `var(--team-${findTeamId(player.roster_id)})`,
                                }}
                              >
                                {findTeamDisplayName(player.roster_id)}
                              </strong>{' '}
                              vs. {findTeamDisplayName(player.opponent_id)}
                            </p>
                            <p>
                              {player.season} - Semana {player.week}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="record-section__player-points">
                        <h3>{formatToBRDecimal(player.points)}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="records-page__regular-season-obs">
            <small>* Inclui apenas temporadas regulares</small>
          </div>
        </div>
      )}
    </>
  );
};
