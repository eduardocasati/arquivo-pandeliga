import { getSeasonYear } from '../repositories/leagueRepository.js';
import { getLeague } from './api/sleeperService.js';

import { LEAGUE_CONFIG } from '../config/leagueConfig.js';

const { CURRENT_SEASON_LEAGUE_ID } = LEAGUE_CONFIG;

// PEGA O LEAGUE_ID DO ANO ANTERIOR
export async function getPreviousLeagueId(leagueId) {
  const league = await getLeague(leagueId);
  return league.previous_league_id;
}

// PEGA O LEAGUE_ID DE TODOS OS ANOS ANTERIORES
export async function getAllPreviousLeagueIds(initialLeagueId) {
  const previousLeagueIds = [];
  let previousLeagueId = await getPreviousLeagueId(initialLeagueId);

  while (previousLeagueId) {
    const season = await getSeasonYear(previousLeagueId);

    previousLeagueIds.push({
      season,
      league_id: previousLeagueId,
    });

    previousLeagueId = await getPreviousLeagueId(previousLeagueId);
  }

  return previousLeagueIds;
}

// PEGA AS INFORMAÇÕES GERAIS DE TODOS OS ANOS DA LIGA
export async function getAllLeagues() {
  const allLeagues = [];
  let leagueId = CURRENT_SEASON_LEAGUE_ID;

  while (leagueId) {
    const league = await getLeague(leagueId);
    allLeagues.push(league);
    leagueId = league.previous_league_id;
  }

  return allLeagues;
}
