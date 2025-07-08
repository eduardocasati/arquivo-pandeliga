import { getCurrentChampionData } from '../../services/championService.js';
import { getCurrentChampionResults } from '../../services/matchupsService.js';
import { sumPointsFromResults } from '../aggregators/sumPoints.js';
import { sumRegularSeasonTeamRecord } from '../aggregators/sumTeamRecord.js';
import { formatToBRDecimal } from '../formatters/numberFormat.js';
import { hasByeWeekInPlayoffs } from '../validators/hasByeWeekInPlayoffs.js';

import teamList from '../../constants/teamList.js';

export async function processChampionData() {
  const championData = await getCurrentChampionData();
  const championResults = await getCurrentChampionResults();
  const foundChampionTeam = teamList.find(
    (team) => team.roster_id === championData.roster_id,
  );

  const totalRegularSeasonPoints = sumPointsFromResults(1, 14, championResults);
  const regularSeasonPpg = totalRegularSeasonPoints / 14;
  const hadByeWeek = hasByeWeekInPlayoffs(championResults);
  const totalPlayoffPoints = sumPointsFromResults(
    hadByeWeek ? 16 : 15, // se teve bye a conta começa na semana 16
    17,
    championResults,
  );
  const playoffsPpg = hadByeWeek
    ? totalPlayoffPoints / 2 // apenas dois jogos se teve bye
    : totalPlayoffPoints / 3;
  const regularSeasonTeamRecord = sumRegularSeasonTeamRecord(
    1,
    14,
    foundChampionTeam.roster_id,
    championData.weekly_matchups,
  );

  return {
    team_name: championData.team_name,
    user_name: championData.user_name,
    team_logo: foundChampionTeam.team_logo,
    total_regular_season_points: formatToBRDecimal(totalRegularSeasonPoints),
    regular_season_ppg: formatToBRDecimal(regularSeasonPpg),
    had_bye_week: hadByeWeek,
    total_playoffs_points: formatToBRDecimal(totalPlayoffPoints),
    playoffs_ppg: formatToBRDecimal(playoffsPpg),
    team_record: {
      wins: regularSeasonTeamRecord.wins,
      losses: regularSeasonTeamRecord.losses,
    },
  };
}
