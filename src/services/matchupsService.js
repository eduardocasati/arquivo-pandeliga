import { getSeasonMatchups } from '../repositories/matchupsRepository.js';
import { getCurrentChampionRosterId } from './championService.js';
import { getAllLeagues, getPreviousLeagueId } from './leagueService.js';

import { LEAGUE_CONFIG } from '../config/leagueConfig.js';

const { CURRENT_SEASON_LEAGUE_ID } = LEAGUE_CONFIG;

/**
 * A função retorna um array com arrays que contém os resultados do campeão e seu adversário
 * @returns {Array<Array<Object>>}
 */
export const getCurrentChampionMatchups = async () => {
  const previousLeagueId = await getPreviousLeagueId(CURRENT_SEASON_LEAGUE_ID);
  const championRosterId = await getCurrentChampionRosterId();
  // allWeeklyMatchups retorna um array de arrays contendo os objetos que são
  // os resultados de cada time naquela semana
  // a chamada a getSeasonMatchups precisa de await apesar do VSCode dizer que não
  // TODO resolver o problema do await abaixo
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
};

// PEGA OS RESULTADOS DO ÚLTIMO CAMPEÃO NA TEMPORADA QUE ELE FOI CAMPEÃO
export const getCurrentChampionResults = async () => {
  const previousLeagueId = await getPreviousLeagueId(CURRENT_SEASON_LEAGUE_ID);
  const championRosterId = await getCurrentChampionRosterId();
  // TODO resolver o problema do await abaixo
  const allWeeklyMatchups = await getSeasonMatchups(previousLeagueId);

  const foundChampionResults = allWeeklyMatchups.map((matchup) => {
    return matchup.find((result) => result.roster_id === championRosterId);
  });

  return foundChampionResults;
};

export const getAllSeasonsMatchups = async () => {
  const allLeaguesData = await getAllLeagues();
  const allSeasonsMatchups = [];

  allLeaguesData.map((league) => {
    const seasonMatchups = getSeasonMatchups(league.league_id);
    allSeasonsMatchups.push({
      season: league.season,
      matchups: seasonMatchups,
    });
  });

  return allSeasonsMatchups;
};

/**
 * // TODO
 * Pega dois times e retorna os matchups desses dois times na temporada
 * @param {number} rosterId_1
 * @param {number} rosterId_2
 * @param {string} leagueId
 * @param {Array<Array<Object>>} weeklyMatchups
 * @returns {Array<Array<Object>>}
 */
export const getHeadToHeadMatchups = (
  rosterId_1,
  rosterId_2,
  leagueId,
  weeklyMatchups,
) => {};
