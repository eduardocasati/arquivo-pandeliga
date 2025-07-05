import { getLeague } from '../services/api/sleeperService.js';

// PEGA O ANO DA TEMPORADA
export async function getSeasonYear(leagueId) {
  const league = await getLeague(leagueId);
  return league.season;
}
