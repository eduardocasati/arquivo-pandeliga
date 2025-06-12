import { getSeasonMatchups } from '../repositories/matchupsRepository.js';
import { getCurrentChampionRosterId } from './championService.js';
import { getPreviousLeagueId } from './leagueService.js';

import { LEAGUE_CONFIG } from '../config/leagueConfig.js';

const { CURRENT_SEASON_LEAGUE_ID } = LEAGUE_CONFIG;

export const getCurrentChampionMatchups = async () => {
  const previousLeagueId = await getPreviousLeagueId(CURRENT_SEASON_LEAGUE_ID);
  const championRosterId = await getCurrentChampionRosterId();
  // allWeeklyMatchups retorna um array de arrays contendo os objetos que são
  // os resultados de cada time naquela semana
  const allWeeklyMatchups = await getSeasonMatchups(previousLeagueId);

  const championMatchups = allWeeklyMatchups.map((weeklyMatchups) => {
    // encontra o matchup_id da partida do campeão nesta semana
    const weeklyMatchupId = weeklyMatchups.find(
      (matchup) => matchup.roster_id === championRosterId,
    ).matchup_id;

    const championWeeklyMatchups = [];

    // guarda os resultados do campeão e seu oponente nesta semana
    weeklyMatchups.forEach((weeklyMatchup) => {
      if (weeklyMatchup.matchup_id === weeklyMatchupId) {
        championWeeklyMatchups.push(weeklyMatchup);
      }
    });

    return championWeeklyMatchups;
  });

  return championMatchups;
};
