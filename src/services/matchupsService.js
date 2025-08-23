import {
  getSeasonMatchups,
  mergeStaticWithApiData,
} from '../data/getSeasonMatchups.js';
import { getCurrentChampionRosterId } from './championService.js';
import { getAllLeagues, getPreviousLeagueId } from './leagueService.js';

import { LEAGUE_CONFIG } from '../config/leagueConfig.js';

const { CURRENT_SEASON_LEAGUE_ID } = LEAGUE_CONFIG;

/**
 * A função retorna um array com arrays que contém os resultados do campeão e seu adversário
 * @returns {Array<Array<Object>>}
 */
export async function getCurrentChampionMatchups() {
  const previousLeagueId = await getPreviousLeagueId(CURRENT_SEASON_LEAGUE_ID);
  const championRosterId = await getCurrentChampionRosterId();
  // allWeeklyMatchups retorna um array de arrays contendo os objetos que são
  // os resultados de cada time naquela semana
  // a chamada a getSeasonMatchups precisa de await apesar do VSCode dizer que não
  const allWeeklyMatchups = await getSeasonMatchups(previousLeagueId);

  const championMatchups = allWeeklyMatchups.map((weeklyMatchups) => {
    // encontra o matchup_id da partida do campeão nesta semana
    const weeklyMatchupId = weeklyMatchups.find(
      (matchup) => matchup.roster_id === championRosterId,
    ).matchup_id;

    const championWeeklyMatchups = [];

    // encontra os dois resultados (campeão e seu oponente) com o mesmo matchup_id e coloca no array
    weeklyMatchups.filter((matchup) => {
      if (matchup.matchup_id === weeklyMatchupId) {
        championWeeklyMatchups.push(matchup);
      }
    });

    return championWeeklyMatchups;
  });

  return championMatchups;
}

// PEGA OS RESULTADOS DO ÚLTIMO CAMPEÃO NA TEMPORADA QUE ELE FOI CAMPEÃO
export async function getCurrentChampionResults() {
  const previousLeagueId = await getPreviousLeagueId(CURRENT_SEASON_LEAGUE_ID);
  const championRosterId = await getCurrentChampionRosterId();
  const allWeeklyMatchups = await getSeasonMatchups(previousLeagueId);

  const foundChampionResults = allWeeklyMatchups.map((matchup) => {
    return matchup.find((result) => result.roster_id === championRosterId);
  });

  return foundChampionResults;
}

export async function getAllSeasonsMatchups() {
  const allLeaguesData = await getAllLeagues();

  const currentSeason = new Date().getFullYear();

  const allSeasonsMatchupsPromises = allLeaguesData
    .filter((league) => Number(league.season) !== currentSeason) // ignora o ano da temporada corrente
    .map(async (league) => {
      const seasonMatchups = await getSeasonMatchups(league.league_id);
      return {
        season: league.season,
        matchups: seasonMatchups,
      };
    });

  const apiMatchups = await Promise.all(allSeasonsMatchupsPromises);

  return mergeStaticWithApiData(apiMatchups);
}
