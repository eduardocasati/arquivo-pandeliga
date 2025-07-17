import { SLEEPER_CONFIG } from '../../config/sleeperConfig.js';

const { BASE_URL } = SLEEPER_CONFIG; // https://api.sleeper.app/v1

// ENDPOINT BASE DA LIGA
function leagueEndpoint(leagueId, path = '') {
  return `${BASE_URL}/league/${leagueId}${path}`;
}

// PEGA AS INFORMAÇÕES GERAIS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>
export async function getLeague(leagueId) {
  const response = await fetch(leagueEndpoint(leagueId, ''));
  return response.json();
}

// PEGA AS INFORMAÇÕES DOS ROSTERS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/rosters
export async function getRosters(leagueId) {
  const response = await fetch(leagueEndpoint(leagueId, '/rosters'));
  return response.json();
}

// PEGA AS INFORMAÇÕES DOS USUÁRIOS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/users
export async function getUsers(leagueId) {
  const response = await fetch(leagueEndpoint(leagueId, '/users'));
  return response.json();
}

// PEGA OS MATCHUPS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/matchups/<week>
export async function getMatchups(leagueId, week) {
  const response = await fetch(leagueEndpoint(leagueId, `/matchups/${week}`));
  return response.json();
}

// PEGA AS INFORMAÇÕES DE TODOS OS JOGADORES EM https://api.sleeper.app/v1/players/nfl
export async function getAllPlayersData() {
  const response = await fetch(`${BASE_URL}/players/nfl`);
  return response.json();
}
