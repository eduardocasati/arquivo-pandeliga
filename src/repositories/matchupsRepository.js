import { getMatchups } from '../services/api/sleeperService.js';

//  PEGA TODOS OS MATCHUPS DE UMA TEMPORADA
export const getSeasonMatchups = async (leagueId) => {
  const numberOfWeeks = 17;
  const matchupPromises = [];

  for (let i = 1; i <= numberOfWeeks; i++) {
    matchupPromises.push(getMatchups(leagueId, i.toString()));
  }

  const matchups = await Promise.all(matchupPromises);

  return matchups;
};
