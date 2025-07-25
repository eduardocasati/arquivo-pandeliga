import { fetchLeague } from '../api/sleeperApi.js';

// PEGA O ANO DA TEMPORADA
export async function getSeasonYear(leagueId) {
  const league = await fetchLeague(leagueId);
  return league.season;
}
