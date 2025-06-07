import { SLEEPER_CONFIG } from '../../config/sleeperConfig.js';
import {
  getLeague,
  getPreviousLeague,
  getPreviousLeagueEndpoint,
  getRosters,
  getUsers,
} from '../sleeperService.js';

const { BASE_URL } = SLEEPER_CONFIG; // https://api.sleeper.app/v1

// =====================
// BUSCA O ATUAL CAMPEÃO
// =====================

// BUSCA O ROSTER ID DO ATUAL CAMPEÃO
const getChampionRosterId = async () => {
  const leagueInfo = await getLeague();
  const rosterId = leagueInfo.metadata.latest_league_winner_roster_id;

  return Number(rosterId);
};

// BUSCA O OWNER ID DO ATUAL CAMPEÃO
const getChampionOwnerId = async () => {
  const leagueRosters = await getRosters();
  const rosterId = await getChampionRosterId();

  const findOwnerId = leagueRosters.find(
    (roster) => roster.roster_id === rosterId,
  );
  const ownerId = findOwnerId.owner_id;

  return ownerId;
};

// BUSCA O NOME DO TIME DO ATUAL CAMPEÃO
const getChampionTeamName = async () => {
  const leagueUsers = await getUsers();
  const ownerId = await getChampionOwnerId();

  const findTeamName = leagueUsers.find((user) => user.user_id === ownerId);
  const teamName = findTeamName.metadata.team_name;

  return teamName;
};

// ORGANIZA AS INFORMAÇÕES COLETADAS SOBRE O CAMPEÃO
const championInfo = async () => {
  const rosterId = await getChampionRosterId();
  const ownerId = await getChampionOwnerId();
  const teamName = await getChampionTeamName();
  const teamInfo = teamList.find((team) => team.team_name === teamName);

  return {
    roster_id: rosterId,
    owner_id: ownerId,
    team_id: teamInfo.team_id,
    display_name: teamInfo.display_name,
    team_name: teamName,
    team_logo: teamInfo.team_logo,
  };
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
    const results = await Promise.allSettled(response);
    // filtra apenas os resultados do campeão
    const championRosterId = await getChampionRosterId();
    const championResults = results.map((result) => {
      return result.value.find((data) => data.roster_id === championRosterId);
    });
    return championResults;
  } catch (error) {
    return console.error(error);
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
    const results = await Promise.allSettled(response);
    // filtra apenas os resultados do campeão
    const championRosterId = await getChampionRosterId();
    const championResults = results.map((result) => {
      return result.value.find((data) => data.roster_id === championRosterId);
    });
    return championResults;
  } catch (error) {
    return console.error(error);
  }
};

getChampionPostSeasonResults();
