import { Header } from '../../components';
import { Route } from '../../routes/$teamId';

import { LoadingSpinner } from '../../components';

import './TeamPage.css';

import { adjustHighestPositionsWithFlex } from '../../utils/adjustHighestPositionsWithFlex.js';
import { getPlayerImageUrl } from '../../utils/assets/playerImages.js';
import { formatToBRDecimal } from '../../utils/formatters/numberFormat.js';
import { abbreviateName } from '../../utils/formatters/playerNameFormat.js';
import { getFromLocalStorage } from '../../utils/localStorage/localStorageUtils.js';
import { calculateTeamStats } from './helpers.js';
import { useTeamStats } from './useTeamStats.js';

import { STORAGE_KEYS } from '../../config/storageKeys.js';
import teams from '../../constants/teams';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

export const TeamPage = () => {
  const { teamId } = Route.useLoaderData();
  const { teamStats, isLoading } = useTeamStats(
    Number(teams.find((team) => team.team_id === teamId).roster_id),
  );

  const activeTeam = teams.find((team) => team.team_id === teamId);

  const allPlayers = getFromLocalStorage(ALL_PLAYERS_DATA);

  const extraTeamStats = calculateTeamStats(activeTeam.history);

  const adjustedHighestPositionsPoints = adjustHighestPositionsWithFlex(
    teamStats.highest_position_points,
  );

  const findOpponentName = (teamId) => {
    return teams.find((team) => team.roster_id === teamId).display_name;
  };

  const getPlayerName = (playerId) => {
    const player = allPlayers[playerId].full_name;

    return abbreviateName(player);
  };

  return (
    <>
      <Header />
      {isLoading || !teamStats ? (
        <div className="loading-spinner--local">
          <LoadingSpinner />
          <p className="loading-spinner__message">Carregando dados do time</p>
        </div>
      ) : (
        <div className="team-page">
          <div className="team-page__header">
            <img
              src={activeTeam.team_logo}
              alt={`${activeTeam.team_name} Logo`}
            />
            <h1>{activeTeam.team_name}</h1>
          </div>

          <div className="team-page__stats">
            <div
              className="stats-card stats-card--historical"
              style={{ '--team-color': `var(--team-${teamId})` }}
            >
              <div className="stats-card__header">
                <h2>Histórico</h2>
              </div>
              <div className="stats-card__body">
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Temporadas</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{teamStats.seasons_played}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Melhor colocação</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.best_finish.position}</h3>
                    <small>{extraTeamStats.best_finish.year}</small>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pior colocação</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.worst_finish.position}</h3>
                    <small>{extraTeamStats.worst_finish.year}</small>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>
                      % de Vitórias*
                      {/* <span>(temp. reg.)</span> */}
                    </h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{formatToBRDecimal(teamStats.win_percentage)}%</h3>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="stats-card"
              style={{ '--team-color': `var(--team-${teamId})` }}
            >
              <div className="stats-card__header">
                <h2>Temporada Regular</h2>
              </div>
              <div className="stats-card__body">
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Vitórias</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{teamStats.wins}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Derrotas</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{teamStats.losses}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pontos</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{formatToBRDecimal(teamStats.total_points)}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pontos por Temporada</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{formatToBRDecimal(teamStats.points_per_season)}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pontos por Jogo</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{formatToBRDecimal(teamStats.points_per_game)}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="stats-card"
              style={{ '--team-color': `var(--team-${teamId})` }}
            >
              <div className="stats-card__header">
                <h2>Pós-temporada</h2>
              </div>
              <div className="stats-card__body">
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Idas aos playoffs</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.playoffs.count}</h3>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Idas à final</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.finals.count}</h3>
                    <small>{extraTeamStats.finals.years.join(', ')}</small>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Títulos</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.championship_wins.count}</h3>
                    <small>
                      {extraTeamStats.championship_wins.years.join(', ')}
                    </small>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Idas ao Shit Bowl</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.shit_bowls.count}</h3>
                    <small>{extraTeamStats.shit_bowls.years.join(', ')}</small>
                  </div>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Derrotas no Shit Bowl</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{extraTeamStats.shit_bowl_losses.count}</h3>
                    <small>
                      {extraTeamStats.shit_bowl_losses.years.join(', ')}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="stats-card stats-card--records"
              style={{ '--team-color': `var(--team-${teamId})` }}
            >
              <div className="stats-card__header">
                <h2>Recordes</h2>
              </div>
              <div className="stats-card__body">
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Melhor jogo</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>
                      {formatToBRDecimal(teamStats.highest_single_game.points)}
                    </h3>
                  </div>
                  <small>
                    vs.{' '}
                    {findOpponentName(
                      teamStats.highest_single_game.opponent_roster_id,
                    )}
                    , {teamStats.highest_single_game.year} - semana{' '}
                    {teamStats.highest_single_game.week}
                  </small>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pior jogo</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>
                      {formatToBRDecimal(teamStats.lowest_single_game.points)}
                    </h3>
                  </div>
                  <small>
                    vs.{' '}
                    {findOpponentName(
                      teamStats.lowest_single_game.opponent_roster_id,
                    )}
                    , {teamStats.lowest_single_game.year} - semana{' '}
                    {teamStats.lowest_single_game.week}
                  </small>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Melhor temporada*</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{teamStats.best_season.record}</h3>
                  </div>
                  <small>{teamStats.best_season.year}</small>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>Pior temporada*</h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>{teamStats.worst_season.record}</h3>
                  </div>
                  <small>{teamStats.worst_season.year}</small>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>
                      Maior Pontos a Favor*
                      {/* <span>(temp reg.)</span> */}
                    </h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>
                      {formatToBRDecimal(
                        teamStats.highest_season_points.points,
                      )}
                    </h3>
                  </div>
                  <small>{teamStats.highest_season_points.year}</small>
                </div>
                <div className="stats-card__row">
                  <div className="stats-card__label">
                    <h3>
                      Menor Pontos a Favor*
                      {/* <span>(temp. reg.)</span> */}
                    </h3>
                  </div>
                  <div className="stats-card__value">
                    <h3>
                      {formatToBRDecimal(teamStats.lowest_season_points.points)}
                    </h3>
                  </div>
                  <small>{teamStats.lowest_season_points.year}</small>
                </div>
              </div>
            </div>

            {/* JOGADORES */}
            <div
              className="stats-card stats-card--players"
              style={{ '--team-color': `var(--team-${teamId})` }}
            >
              <div className="stats-card__header">
                <h2>Maiores Pontuadores</h2>
              </div>

              <div className="stats-card--players__wrapper">
                {/* QUARTERBACK */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.qb.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position quarterback--text">
                        <p>qb</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>
                          {getPlayerName(
                            adjustedHighestPositionsPoints.qb.player_id,
                          )}
                        </h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.qb.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.qb.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.qb.year} - semana{' '}
                        {adjustedHighestPositionsPoints.qb.week}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RUNNING BACK */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.rb.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position runningback--text">
                        <p>rb</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>
                          {getPlayerName(
                            adjustedHighestPositionsPoints.rb.player_id,
                          )}
                        </h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.rb.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.rb.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.rb.year} - semana{' '}
                        {adjustedHighestPositionsPoints.rb.week}
                      </div>
                    </div>
                  </div>
                </div>

                {/* WIDE RECEIVER */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.wr.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position widereceiver--text">
                        <p>wr</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>
                          {getPlayerName(
                            adjustedHighestPositionsPoints.wr.player_id,
                          )}
                        </h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.wr.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.wr.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.wr.year} - semana{' '}
                        {adjustedHighestPositionsPoints.wr.week}
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIGHT END */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.te.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position tightend--text">
                        <p>te</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>
                          {getPlayerName(
                            adjustedHighestPositionsPoints.te.player_id,
                          )}
                        </h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.te.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.te.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.te.year} - semana{' '}
                        {adjustedHighestPositionsPoints.te.week}
                      </div>
                    </div>
                  </div>
                </div>

                {/* KICKER */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.k.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position kicker--text">
                        <p>k</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>
                          {getPlayerName(
                            adjustedHighestPositionsPoints.k.player_id,
                          )}
                        </h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.k.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.k.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.k.year} - semana{' '}
                        {adjustedHighestPositionsPoints.k.week}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DEFENSE */}
                <div className="stats-card__player-card">
                  <div className="stats-card__player-avatar">
                    <img
                      src={getPlayerImageUrl(
                        adjustedHighestPositionsPoints.def.player_id,
                      )}
                      alt=""
                    />
                  </div>
                  <div className="stats-card__player-details">
                    <div className="stats-card__player-header">
                      <div className="stats-card__player-position defense--text">
                        <p>def</p>
                      </div>
                      <div className="stats-card__player-name">
                        <h3>{adjustedHighestPositionsPoints.def.player_id}</h3>
                      </div>
                      <div className="stats-card__player-points">
                        <h3>
                          {formatToBRDecimal(
                            adjustedHighestPositionsPoints.def.points,
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="stats-card__player-footer">
                      <div className="stats-card__match-details">
                        vs.{' '}
                        {findOpponentName(
                          adjustedHighestPositionsPoints.def.opponent_roster_id,
                        )}
                        , {adjustedHighestPositionsPoints.def.year} - semana{' '}
                        {adjustedHighestPositionsPoints.def.week}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <small className="team-page__regular-season-obs">
              * Inclui apenas temporadas regulares
            </small>
          </div>
        </div>
      )}
    </>
  );
};
