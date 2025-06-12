import { getLeague, getRosters, getUsers } from './api/sleeperService.js';
import { getCurrentChampionMatchups } from './matchupsService.js';

import { LEAGUE_CONFIG } from '../config/leagueConfig.js';

const { CURRENT_SEASON_LEAGUE_ID } = LEAGUE_CONFIG;

export const getCurrentChampionRosterId = async () => {
  const league = await getLeague(CURRENT_SEASON_LEAGUE_ID);
  return Number(league.metadata.latest_league_winner_roster_id);
};

export const getCurrentChampionData = async () => {
  const championRosterId = await getCurrentChampionRosterId();
  const rosters = await getRosters(CURRENT_SEASON_LEAGUE_ID);
  const users = await getUsers(CURRENT_SEASON_LEAGUE_ID);

  // o owner_id em /rosters é o user_id em /users ¯\_(ツ)_/¯
  const foundChampion = rosters.find(
    (roster) => roster.roster_id === Number(championRosterId),
  );
  const championData = users.find(
    (user) => user.user_id === foundChampion.owner_id,
  );
  const championWeeklyMatchups = await getCurrentChampionMatchups();

  return {
    team_name: championData.metadata.team_name,
    user_name: championData.display_name, // aqui o valor display_name é o nome de usuário no Sleeper
    roster_id: Number(championRosterId),
    owner_id: championData.user_id, // user_id = owner_id (ex: '703075560737288192')
    weekly_matchups: championWeeklyMatchups,
  };
};
