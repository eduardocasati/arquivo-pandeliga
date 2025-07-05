import { getMatchups } from '../services/api/sleeperService.js';

/**
 * PEGA TODOS OS MATCHUPS DE UMA TEMPORADA
 * cada array com arrays, onde cada array contém todos os resultados da semana
 * @returns {Array<Array<Object>>}
 */
export async function getSeasonMatchups(leagueId) {
  const numberOfWeeks = 17;
  const matchupPromises = [];

  for (let i = 1; i <= numberOfWeeks; i++) {
    matchupPromises.push(getMatchups(leagueId, i.toString()));
  }

  const matchups = await Promise.all(matchupPromises);

  return matchups;
}
