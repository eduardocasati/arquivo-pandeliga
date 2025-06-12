import { getLeague } from '../services/api/sleeperService.js';

// PEGA O ANO DA TEMPORADA
export const getSeasonYear = async (leagueId) => {
  const league = await getLeague(leagueId);
  return league.season;
};
