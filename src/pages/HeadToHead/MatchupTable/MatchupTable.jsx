import { useEffect, useMemo, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import './MatchupTable.css';

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
            <p style={{ '--points-color': firstPointsColor }}>
              {firstTeamMatchup.points.toFixed(2)}
            </p>
            <p style={{ '--points-color': secondPointsColor }}>
              {secondTeamMatchup.points.toFixed(2)}
            </p>
          </>
        )}
      </div>

      {/* JOGADORES */}
      <div className="matchup-table__players">
        {/* QUARTERBACK */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/11566.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">J. Daniels</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            31,78
          </p>
          <div className="matchup-position-icon quarterback--text">
            <p>QB</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            21,86
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">B. Nix</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/11563.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* RUNNING BACK 1 */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/8155.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">B. Hall</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            6,30
          </p>
          <div className="matchup-position-icon runningback--text">
            <p>RB</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            18,90
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">S. Barkley</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/4866.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* RUNNING BACK 2 */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/9508.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">T. Spears</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            13,30
          </p>
          <div className="matchup-position-icon runningback--text">
            <p>RB</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            27,60
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">J. Taylor</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/6813.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* WIDE RECEIVER 1 */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/6794.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">J. Jefferson</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            17,20
          </p>
          <div className="matchup-position-icon widereceiver--text">
            <p>WR</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            22,90
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">P. Nacua</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/9493.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* WIDE RECEIVER 2 */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/5927.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">T. McLaurin</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            1,50
          </p>
          <div className="matchup-position-icon widereceiver--text">
            <p>WR</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            17,60
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">G. Wilson</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/8146.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* TIGHT END */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/8130.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">T. McBride</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            30,30
          </p>
          <div className="matchup-position-icon tightend--text">
            <p>TE</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            14,60
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">B. Bowers</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/11604.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* FLEX */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/11631.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">B. Thomas</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            23,90
          </p>
          <div className="matchup-position-icon">
            <p>
              <span className="widereceiver--text">W</span>
              <span className="runningback--text">R</span>
              <span className="tightend--text">T</span>
            </p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            5,80
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">D. Achane</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/9226.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* KICKER */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/11792.jpg"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">W. Reichard</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            10,50
          </p>
          <div className="matchup-position-icon kicker--text">
            <p>K</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            0,00
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">K. Fairbairn</p>
              <img
                src="https://sleepercdn.com/content/nfl/players/thumb/3451.jpg"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>

        {/* DEFENSE */}
        <div className="matchup-row">
          <div className="matchup-player matchup-player--left">
            <div className="matchup-player__group">
              <img
                src="https://sleepercdn.com/images/team_logos/nfl/min.png"
                alt=""
                className="matchup-player__image"
              />
              <p className="matchup-player__name">MIN</p>
            </div>
          </div>
          <p className="matchup-player__score matchup-player__score--left">
            5,00
          </p>
          <div className="matchup-position-icon defense--text">
            <p>DEF</p>
          </div>
          <p className="matchup-player__score matchup-player__score--right">
            16,00
          </p>
          <div className="matchup-player matchup-player--right">
            <div className="matchup-player__group">
              <p className="matchup-player__name">SEA</p>
              <img
                src="https://sleepercdn.com/images/team_logos/nfl/sea.png"
                alt=""
                className="matchup-player__image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
