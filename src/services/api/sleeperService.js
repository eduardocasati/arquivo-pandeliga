import { SLEEPER_CONFIG } from '../../config/sleeperConfig.js';

const { BASE_URL } = SLEEPER_CONFIG; // https://api.sleeper.app/v1

// ENDPOINT BASE DA LIGA
const leagueEndpoint = (leagueId, path = '') =>
  `${BASE_URL}/league/${leagueId}${path}`;

// PEGA AS INFORMAÇÕES GERAIS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>
export const getLeague = async (leagueId) => {
  const response = await fetch(leagueEndpoint(leagueId, ''));
  return response.json();
};

// PEGA AS INFORMAÇÕES DOS ROSTERS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/rosters
export const getRosters = async (leagueId) => {
  const response = await fetch(leagueEndpoint(leagueId, '/rosters'));
  return response.json();
};

// PEGA AS INFORMAÇÕES DOS USUÁRIOS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/users
export const getUsers = async (leagueId) => {
  const response = await fetch(leagueEndpoint(leagueId, '/users'));
  return response.json();
};

// PEGA OS MATCHUPS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/matchups/<week>
export const getMatchups = async (leagueId, week) => {
  const response = await fetch(leagueEndpoint(leagueId, `/matchups/${week}`));
  return response.json();
};
