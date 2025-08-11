import { useMemo } from 'react';

import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups';

import { transformAllTeamsHistoricalStats } from '../../utils/transformers/historicalStatsTransformer';

export const useHistoricalStandings = () => {
  const { data, isLoading } = useAllSeasonsMatchups();
  const allSeasonsMatchups = data?.allSeasonsMatchups;

  const statsByTeam = useMemo(() => {
    if (!allSeasonsMatchups) return {};
    return transformAllTeamsHistoricalStats(allSeasonsMatchups);
  }, [allSeasonsMatchups]);

  return { statsByTeam, isLoading };
};
