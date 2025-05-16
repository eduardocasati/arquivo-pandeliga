import { LEAGUE_CONFIG } from '../config/leagueConfig.js';
import { SLEEPER_CONFIG } from '../config/sleeperConfig.js';

const { LEAGUE_ID } = LEAGUE_CONFIG;
const { BASE_URL } = SLEEPER_CONFIG;

// Endpoint base da liga
const leagueEndpoint = (path = '') => `${BASE_URL}/league/${LEAGUE_ID}${path}`;

// Pega as informações gerais da liga em https://api.sleeper.app/v1/league/<league_id>
export const getLeague = async () => {
  const response = await fetch(leagueEndpoint(''));
  return response.json();
};

// Pega as informações dos rosters da liga em https://api.sleeper.app/v1/league/<league_id>/rosters
export const getRosters = async () => {
  const response = await fetch(leagueEndpoint('/rosters'));
  return response.json();
};

// Pega as informações dos usuários da liga em https://api.sleeper.app/v1/league/<league_id>/users
export const getUsers = async () => {
  const response = await fetch(leagueEndpoint('/users'));
  return response.json();
};

// Pega os matchups da liga em https://api.sleeper.app/v1/league/<league_id>/matchups/<week>
export const getMatchups = async (week) => {
  const response = await fetch(leagueEndpoint(`/matchups/${week}`));
  return response.json();
};
