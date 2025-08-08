const PLAYOFF_FINAL = 'Final 🏆';
const PLAYOFF_SEMIFINAL = 'Semifinal';
const PLAYOFF_QUARTERFINAL = 'Quartas de final';

const PLAYOFF_THIRD_PLACE = 'Disputa de 3º lugar';
const PLAYOFF_FIFTH_PLACE = 'Disputa de 5º lugar';
const PLAYOFF_SEVENTH_PLACE = 'Disputa de 7º lugar';
const PLAYOFF_SHIT_BOWL = 'Shit Bowl 💩';
const PLAYOFF_PRE_SHIT_BOWL = 'Fuga do Shit Bowl'; // alternativa: 'Pré-Shit Bowl'

// mapeamento para as temporadas até 2023
const PLAYOFF_ROUNDS_LEGACY = {
  // 2020
  season_2020_week_15_matchup_id_1: PLAYOFF_SEMIFINAL,
  season_2020_week_15_matchup_id_2: PLAYOFF_SEMIFINAL,
  season_2020_week_16_matchup_id_1: PLAYOFF_FINAL,
  season_2020_week_16_matchup_id_2: PLAYOFF_SHIT_BOWL,
  season_2020_week_16_matchup_id_3: PLAYOFF_THIRD_PLACE,

  // 2021
  season_2021_week_15_matchup_id_1: PLAYOFF_QUARTERFINAL,
  season_2021_week_15_matchup_id_2: PLAYOFF_QUARTERFINAL,
  season_2021_week_16_matchup_id_1: PLAYOFF_SEMIFINAL,
  season_2021_week_16_matchup_id_2: PLAYOFF_SEMIFINAL,
  season_2021_week_17_matchup_id_1: PLAYOFF_FIFTH_PLACE,
  season_2021_week_17_matchup_id_2: PLAYOFF_SHIT_BOWL,
  season_2021_week_17_matchup_id_3: PLAYOFF_FINAL,
  season_2021_week_17_matchup_id_4: PLAYOFF_THIRD_PLACE,

  // 2022
  season_2022_week_15_matchup_id_1: PLAYOFF_QUARTERFINAL,
  season_2022_week_15_matchup_id_2: PLAYOFF_QUARTERFINAL,
  season_2022_week_15_matchup_id_4: PLAYOFF_SHIT_BOWL,
  season_2022_week_16_matchup_id_1: PLAYOFF_SEMIFINAL,
  season_2022_week_16_matchup_id_2: PLAYOFF_SEMIFINAL,
  season_2022_week_16_matchup_id_3: PLAYOFF_FIFTH_PLACE,
  season_2022_week_17_matchup_id_1: PLAYOFF_FINAL,
  season_2022_week_17_matchup_id_2: PLAYOFF_THIRD_PLACE,

  // 2023
  season_2023_week_15_matchup_id_1: PLAYOFF_QUARTERFINAL,
  season_2023_week_15_matchup_id_2: PLAYOFF_QUARTERFINAL,
  season_2023_week_15_matchup_id_4: PLAYOFF_SHIT_BOWL,
  season_2023_week_16_matchup_id_1: PLAYOFF_SEMIFINAL,
  season_2023_week_16_matchup_id_2: PLAYOFF_SEMIFINAL,
  season_2023_week_16_matchup_id_3: PLAYOFF_FIFTH_PLACE,
  season_2023_week_17_matchup_id_1: PLAYOFF_FINAL,
  season_2023_week_17_matchup_id_2: PLAYOFF_THIRD_PLACE,
};

// mapeamento fixo para 2024 em diante
const PLAYOFF_ROUNDS_TEMPLATE = {
  week_15_matchup_id_1: PLAYOFF_QUARTERFINAL,
  week_15_matchup_id_2: PLAYOFF_QUARTERFINAL,
  week_15_matchup_id_4: PLAYOFF_PRE_SHIT_BOWL,
  week_15_matchup_id_5: PLAYOFF_PRE_SHIT_BOWL,
  week_16_matchup_id_1: PLAYOFF_SEMIFINAL,
  week_16_matchup_id_2: PLAYOFF_SEMIFINAL,
  week_16_matchup_id_3: PLAYOFF_FIFTH_PLACE,
  week_16_matchup_id_4: PLAYOFF_SHIT_BOWL,
  week_16_matchup_id_5: PLAYOFF_SEVENTH_PLACE,
  week_17_matchup_id_1: PLAYOFF_FINAL,
  week_17_matchup_id_2: PLAYOFF_THIRD_PLACE,
};

export function getPlayoffRound(year, week, matchupId) {
  if (year >= 2024) {
    const key = `week_${week}_matchup_id_${matchupId}`;
    return PLAYOFF_ROUNDS_TEMPLATE[key] || '';
  }

  const legacyKey = `season_${year}_week_${week}_matchup_id_${matchupId}`;
  return PLAYOFF_ROUNDS_LEGACY[legacyKey] || '';
}
