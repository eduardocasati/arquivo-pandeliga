// =====================
// BUSCA O ATUAL CAMPEÃO
// =====================

import { getLeague, getRosters, getUsers } from './sleeperService.js';

// Busca o ROSTER ID do atual campeão
export const getChampionRosterId = async () => {
  const leagueInfo = await getLeague();
  const rosterId = leagueInfo.metadata.latest_league_winner_roster_id;

  return rosterId;
};

// Busca o OWNER ID do atual campeão
export const getChampionOwnerId = async () => {
  const leagueRosters = await getRosters();
  const rosterId = await getChampionRosterId();

  const findOwnerId = leagueRosters.find(
    (roster) => roster.roster_id === Number(rosterId),
  );
  const ownerId = findOwnerId.owner_id;

  return ownerId;
};

// Busca o NOME DO TIME do atual campeão
export const getChampionTeamName = async () => {
  const leagueUsers = await getUsers();
  const ownerId = await getChampionOwnerId();

  const findTeamName = leagueUsers.find((user) => user.user_id === ownerId);
  const teamName = findTeamName.metadata.team_name;

  return teamName;
};
