const PLAYOFF_FINAL = 'Final 🏆';
const PLAYOFF_SEMIFINAL = 'Semifinal';
const PLAYOFF_QUARTERFINAL = 'Quartas de final';

const PLAYOFF_THIRD_PLACE = 'Terceiro lugar';
const PLAYOFF_FIFTH_PLACE = 'Quinto lugar';
const PLAYOFF_SEVENTH_PLACE = 'Sétimo lugar';
const PLAYOFF_SHIT_BOWL = 'Shit Bowl 💩';

export function getPlayoffRound(year, week, matchupId) {
  const playoffRoundsByKey = {
    // temporada 2020
    season_2020_week_15_matchup_id_1: PLAYOFF_SEMIFINAL,
    season_2020_week_15_matchup_id_2: PLAYOFF_SEMIFINAL,
    season_2020_week_16_matchup_id_1: PLAYOFF_FINAL,
    season_2020_week_16_matchup_id_2: PLAYOFF_SHIT_BOWL,
    season_2020_week_16_matchup_id_3: PLAYOFF_THIRD_PLACE,

    // temporada 2021
    season_2021_week_15_matchup_id_1: PLAYOFF_QUARTERFINAL,
    season_2021_week_15_matchup_id_2: PLAYOFF_QUARTERFINAL,
    season_2021_week_16_matchup_id_1: PLAYOFF_SEMIFINAL,
    season_2021_week_16_matchup_id_2: PLAYOFF_SEMIFINAL,
    season_2021_week_17_matchup_id_1: PLAYOFF_FIFTH_PLACE,
    season_2021_week_17_matchup_id_2: PLAYOFF_SHIT_BOWL,
    season_2021_week_17_matchup_id_3: PLAYOFF_FINAL,
    season_2021_week_17_matchup_id_4: PLAYOFF_THIRD_PLACE,
  };

  const key = `season_${year}_week_${week}_matchup_id_${matchupId}`;

  return playoffRoundsByKey[key] || '';
}
