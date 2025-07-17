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
    </div>
  );
};
