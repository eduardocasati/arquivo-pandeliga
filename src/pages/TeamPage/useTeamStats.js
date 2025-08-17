import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups';
import { transformHistoricalStatsForSingleTeam } from '../../utils/transformers/historicalStatsTransformer';

export const useTeamStats = (rosterId) => {
  const { data, isLoading } = useAllSeasonsMatchups();
  const allSeasonsMatchups = data?.allSeasonsMatchups;

  const teamStats = useMemo(() => {
    if (!allSeasonsMatchups || !rosterId) return null;
    return transformHistoricalStatsForSingleTeam(allSeasonsMatchups, rosterId);
  }, [allSeasonsMatchups, rosterId]);

  return { teamStats, isLoading };
};
