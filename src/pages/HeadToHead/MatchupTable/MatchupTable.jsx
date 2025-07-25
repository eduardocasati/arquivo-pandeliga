import { useEffect, useMemo, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import './MatchupTable.css';

import { formatToBRDecimal } from '../../../utils/formatters/numberFormat';
import { usePlayerNames } from './usePlayerNames';

import teams from '../../../constants/teams';

export const MatchupTable = ({
  selectedFirstTeam,
  selectedSecondTeam,
  headToHeadMatchups = [],
}) => {
  const [pageIndex, setPageIndex] = useState(0);

  // garante que headToHeadMatchups é um array
  const safeMatchups = Array.isArray(headToHeadMatchups)
    ? headToHeadMatchups
    : [];
  const hasPages = safeMatchups.length > 0;
  const currentMatchup = hasPages ? safeMatchups[pageIndex] : null;

  // reseta o índice quando os matchups mudam
  useEffect(() => {
    setPageIndex(0);
  }, [headToHeadMatchups]);

  // obtém os dados dos dois times ordenados corretamente
  const [firstTeamMatchup, secondTeamMatchup] = useMemo(() => {
    if (!currentMatchup || !Array.isArray(currentMatchup.matchup)) {
      return [null, null];
    }

    const first = currentMatchup.matchup.find(
      (m) => Number(m.roster_id) === Number(selectedFirstTeam),
    );
    const second = currentMatchup.matchup.find(
      (m) => Number(m.roster_id) === Number(selectedSecondTeam),
    );

    return [first, second];
  }, [currentMatchup, selectedFirstTeam, selectedSecondTeam]);

  // paginação
  const handleNextMatchup = () => {
    if (pageIndex < safeMatchups.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      setPageIndex(0);
    }
  };

  const handlePreviousMatchup = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else {
      setPageIndex(safeMatchups.length - 1);
    }
  };

  // cor dinâmica dos pontos
  const getPointsColor = (a, b) => {
    if (a == null || b == null) return 'inherit';
    return a > b
      ? 'var(--color-text-accent-green)'
      : 'var(--color-text-accent-pink)';
  };
  const firstPointsColor = getPointsColor(
    firstTeamMatchup?.points,
    secondTeamMatchup?.points,
  );
  const secondPointsColor = getPointsColor(
    secondTeamMatchup?.points,
    firstTeamMatchup?.points,
  );

  // encontra os nomes dos jogadores
  const firstTeamPlayerNames = usePlayerNames(firstTeamMatchup?.starters);
  const secondTeamPlayerNames = usePlayerNames(secondTeamMatchup?.starters);

  // utils
  // essa função serve para retornar uma imagem fallback caso não havia jogador escalado (id = 0)
  const getPlayerImageUrl = (playerId) => {
    const id = Number(playerId);
    if (id === 0) {
      return 'https://sleepercdn.com/images/v2/icons/player_default.webp';
    }
    if (isNaN(id)) {
      // específico pra lidar com os times (defesas)
      return `https://sleepercdn.com/images/team_logos/nfl/${String(playerId).toLowerCase()}.png`;
    }
    return `https://sleepercdn.com/content/nfl/players/thumb/${id}.jpg`;
  };
  // essa função pega o team_id dos times para colorir as bordas da tabela com as cores dos times
  const getTeamIdByRosterId = (rosterId) => {
    return teams.find((team) => team.roster_id === Number(rosterId))?.team_id;
  };
  const firstTeamId = getTeamIdByRosterId(selectedFirstTeam);
  const secondTeamId = getTeamIdByRosterId(selectedSecondTeam);

  return (
    <div className="matchup-table">
      <h1 className="matchup-table__title">CONFRONTOS</h1>

      <div className="matchup-table__paging-title">
        <button onClick={handlePreviousMatchup}>
          <GrFormPrevious />
        </button>
        <h1>
          {currentMatchup &&
            `${currentMatchup.season} - Semana ${currentMatchup.week}`}
        </h1>
        <button onClick={handleNextMatchup}>
          <GrFormNext />
        </button>
      </div>

      <div className="matchup-table__points">
        {firstTeamMatchup && secondTeamMatchup && (
          <>
            <p
              className="matchup-table__points-number points-number--left"
              style={{ '--points-color': firstPointsColor }}
            >
              {formatToBRDecimal(firstTeamMatchup.points)}
            </p>
            <p className="matchup-table__points-total">Total</p>
            <p
              className="matchup-table__points-number .points-number--right"
              style={{ '--points-color': secondPointsColor }}
            >
              {formatToBRDecimal(secondTeamMatchup.points)}
            </p>
          </>
        )}
      </div>

      {/* JOGADORES */}
      {firstTeamMatchup && secondTeamMatchup && (
        <div className="matchup-table__players">
          {/* QUARTERBACK - INÍDICE 0 */}
          <div
            className="matchup-row  matchup-row--odd"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[0])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[0]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[0])}
            </p>
            <div className="matchup-position-icon quarterback--icon">
              <p>QB</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[0])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[0]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[0])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* RUNNING BACK 1 - ÍNDICE 1 */}
          <div
            className="matchup-row matchup-row--even"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[1])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[1]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[1])}
            </p>
            <div className="matchup-position-icon runningback--icon">
              <p>RB</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[1])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[1]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[1])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* RUNNING BACK 2 - ÍNDICE 2 */}
          <div
            className="matchup-row matchup-row--odd"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[2])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[2]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[2])}
            </p>
            <div className="matchup-position-icon runningback--icon">
              <p>RB</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[2])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[2]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[2])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* WIDE RECEIVER 1 - ÍNDICE 3 */}
          <div
            className="matchup-row matchup-row--even"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[3])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[3]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[3])}
            </p>
            <div className="matchup-position-icon widereceiver--icon">
              <p>WR</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[3])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[3]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[3])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* WIDE RECEIVER 2 - ÍNDICE 4 */}
          <div
            className="matchup-row matchup-row--odd"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[4])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[4]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[4])}
            </p>
            <div className="matchup-position-icon widereceiver--icon">
              <p>WR</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[4])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[4]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[4])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* TIGHT END - ÍNDICE 5 */}
          <div
            className="matchup-row matchup-row--even"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[5])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[5]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[5])}
            </p>
            <div className="matchup-position-icon tightend--icon">
              <p>TE</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[5])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[5]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[5])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* FLEX - ÍNDICE 6 */}
          <div
            className="matchup-row matchup-row--odd"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[6])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[6]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[6])}
            </p>
            <div className="matchup-position-icon flex--icon">
              <p>WRT</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[6])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[6]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[6])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* KICKER - ÍNDICE 7 */}
          <div
            className="matchup-row matchup-row--even"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(firstTeamMatchup.starters[7])}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamPlayerNames[7]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[7])}
            </p>
            <div className="matchup-position-icon kicker--icon">
              <p>K</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[7])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamPlayerNames[7]}
                </p>
                <img
                  src={getPlayerImageUrl(secondTeamMatchup.starters[7])}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>

          {/* DEFENSE - ÍNDICE 8 */}
          <div
            className="matchup-row matchup-row--odd"
            style={{
              borderLeft: `4px solid var(--team-${firstTeamId})`,
              borderRight: `4px solid var(--team-${secondTeamId})`,
            }}
          >
            <div className="matchup-player matchup-player--left">
              <div className="matchup-player__group">
                <img
                  src={getPlayerImageUrl(
                    firstTeamMatchup.starters[8].toLowerCase(),
                  )}
                  alt=""
                  className="matchup-player__image"
                />
                <p className="matchup-player__name">
                  {firstTeamMatchup.starters[8]}
                </p>
              </div>
            </div>
            <p className="matchup-player__score matchup-player__score--left">
              {formatToBRDecimal(firstTeamMatchup.starters_points[8])}
            </p>
            <div className="matchup-position-icon defense--icon">
              <p>DEF</p>
            </div>
            <p className="matchup-player__score matchup-player__score--right">
              {formatToBRDecimal(secondTeamMatchup.starters_points[8])}
            </p>
            <div className="matchup-player matchup-player--right">
              <div className="matchup-player__group">
                <p className="matchup-player__name">
                  {secondTeamMatchup.starters[8]}
                </p>
                <img
                  src={getPlayerImageUrl(
                    secondTeamMatchup.starters[8].toLowerCase(),
                  )}
                  alt=""
                  className="matchup-player__image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
