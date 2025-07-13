import { useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import './MatchupTable.css';

export const MatchupTable = ({ headToHeadMatchups = [] }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const safeMatchups = headToHeadMatchups ?? []; // garante array
  const currentMatchup = safeMatchups[pageIndex];

  // reseta o index para 0 sempre que os times mudam
  useEffect(() => {
    setPageIndex(0);
  }, [headToHeadMatchups]);

  const handleNextMatchup = () => {
    if (pageIndex < headToHeadMatchups.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      setPageIndex(0);
    }
  };

  const handlePreviousMatchup = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else setPageIndex(headToHeadMatchups.length - 1);
  };

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
    </div>
  );
};
