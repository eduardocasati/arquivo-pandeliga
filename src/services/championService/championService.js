// import { SLEEPER_CONFIG } from '../../config/sleeperConfig.js';
import {
  getLeague,
  getPreviousLeague,
  getPreviousLeagueEndpoint,
  getRosters,
  getUsers,
} from '../sleeperService.js';

// const { BASE_URL } = SLEEPER_CONFIG; // https://api.sleeper.app/v1

// =====================
// BUSCA O ATUAL CAMPEÃO
// =====================

// BUSCA O ROSTER ID DO ATUAL CAMPEÃO
export const getChampionRosterId = async () => {
  const leagueInfo = await getLeague();
  const rosterId = leagueInfo.metadata.latest_league_winner_roster_id;

  return Number(rosterId);
};

// BUSCA O OWNER ID DO ATUAL CAMPEÃO
export const getChampionOwnerId = async () => {
  const leagueRosters = await getRosters();
  const rosterId = await getChampionRosterId();

  const findOwnerId = leagueRosters.find(
    (roster) => roster.roster_id === rosterId,
  );
  const ownerId = findOwnerId.owner_id;

  return ownerId;
};

// BUSCA O NOME DO TIME DO ATUAL CAMPEÃO
export const getChampionTeamName = async () => {
  const leagueUsers = await getUsers();
  const ownerId = await getChampionOwnerId();

  const findTeamName = leagueUsers.find((user) => user.user_id === ownerId);
  const teamName = findTeamName.metadata.team_name;

  return teamName;
};

export const getChampionUserName = async () => {
  const leagueUsers = await getUsers();
  const ownerId = await await getChampionOwnerId(); // o owner_id no endpoint de rosters é igual ao user_id no endpoint de users
  const findUserName = leagueUsers.find((user) => user.user_id === ownerId);
  const userName = findUserName.display_name;
  return userName;
};

// BUSCA AS PONTUAÇÕES DO CAMPEÃO NA TEMPORADA REGULAR
export const getChampionRegularSeasonResults = async () => {
  const previousLeagueEndpoint = await getPreviousLeagueEndpoint();
  // cria um array de 14 posições contendo as urls de cada semana
  const weeksUrls = Array.from(
    { length: 14 },
    (_, i) => `${previousLeagueEndpoint}/matchups/${i + 1}`,
  );
  // pega os resultados de cada semana
  const response = weeksUrls.map((url) => fetch(url).then((res) => res.json()));
  // retorna os resultados de cada semana
  try {
    const results = await Promise.all(response);
    // filtra apenas os resultados do campeão
    const championRosterId = await getChampionRosterId();
    const championResults = results.map((result) => {
      return result.find((data) => data.roster_id === championRosterId);
    });
    return championResults;
  } catch (error) {
    return console.error(
      'Erro ao buscar dados dos regular season matchups do campeão:',
      error,
    );
  }
};

// BUSCA AS PONTUAÇÕES DO CAMPEÃO NOS PLAYOFFS
export const getChampionPostSeasonResults = async () => {
  const previousLeagueEndpoint = await getPreviousLeagueEndpoint();
  // pega qual semana os playoffs começaram
  const previousLeague = await getPreviousLeague();
  const playoffsWeekStart = previousLeague.settings.playoff_week_start;
  // cria um array de 3 posições contendo as urls de cada semana
  const weeksUrls = Array.from(
    { length: 3 },
    (_, i) => `${previousLeagueEndpoint}/matchups/${playoffsWeekStart + i}`,
  );
  // pega os resultados de cada semana
  const response = weeksUrls.map((url) => fetch(url).then((res) => res.json()));
  // retorna os resultados de cada semana
  try {
    const results = await Promise.all(response);
    // filtra apenas os resultados do campeão
    const championRosterId = await getChampionRosterId();
    const championResults = results.map((result) => {
      return result.find((data) => data.roster_id === championRosterId);
    });
    return championResults;
  } catch (error) {
    return console.error(
      'Erro ao buscar dados dos playoff matchups do campeão:',
      error,
    );
  }
};
