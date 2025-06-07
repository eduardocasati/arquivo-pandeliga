import { LEAGUE_CONFIG } from '../config/leagueConfig.js';
import { SLEEPER_CONFIG } from '../config/sleeperConfig.js';

const { LEAGUE_ID } = LEAGUE_CONFIG; // 1181787756111253504
const { BASE_URL } = SLEEPER_CONFIG; // https://api.sleeper.app/v1

// ENDPOINT BASE DA LIGA
const leagueEndpoint = (path = '') => `${BASE_URL}/league/${LEAGUE_ID}${path}`;

// PEGA AS INFORMAÇÕES GERAIS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>
export const getLeague = async () => {
  const response = await fetch(leagueEndpoint(''));
  return response.json();
};

// PEGA O LEAGUE ID DO ANO ANTERIOR
export const getPreviousLeagueId = async () => {
  const response = await getLeague();
  return response.previous_league_id;
};

// ENDPOINT DO ANO ANTERIOR
export const getPreviousLeagueEndpoint = async () => {
  const previousLeagueId = await getPreviousLeagueId();
  const previousLeagueEndpoint = `${BASE_URL}/league/${previousLeagueId}`;
  return previousLeagueEndpoint;
};

// PEGA AS INFORMAÇÕES DA LIGA DO ANO ANTERIOR
export const getPreviousLeague = async () => {
  const previousLeagueEndpoint = await getPreviousLeagueEndpoint();
  const previousLeague = await fetch(`${previousLeagueEndpoint}`);
  return previousLeague.json();
};

// PEGA AS INFORMAÇÕES DOS ROSTERS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/rosters
export const getRosters = async () => {
  const response = await fetch(leagueEndpoint('/rosters'));
  return response.json();
};

// PEGA AS INFORMAÇÕES DOS USUÁRIOS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/users
export const getUsers = async () => {
  const response = await fetch(leagueEndpoint('/users'));
  return response.json();
};

// PEGA OS MATCHUPS DA LIGA EM https://api.sleeper.app/v1/league/<league_id>/matchups/<week>
export const getMatchups = async (week) => {
  const response = await fetch(leagueEndpoint(`/matchups/${week}`));
  return response.json();
};
