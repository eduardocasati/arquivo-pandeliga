/**
 * @param {number} initialWeek - A semana para começar a soma (1 para temporada regular, 15 para os playoffs)
 * @param {number} lastWeek - A semana onde a soma deve parar (14 para a temporada regular, 17 para os playoffs)
 * @param {number} rosterId - roster_id do time a ter suas vitórias e derrotas somadas
 * @param {Array} weeklyMatchups - array contendo as matchups
 */

export const sumRegularSeasonTeamRecord = (
  initialWeek,
  lastWeek,
  rosterId,
  weeklyMatchups,
) => {
  let wins = 0;
  let losses = 0;

  for (let i = initialWeek - 1; i <= lastWeek - 1; i++) {
    const teamPoints = weeklyMatchups[i].find(
      (result) => result.roster_id === rosterId,
    ).points;
    const opponentPoints = weeklyMatchups[i].find(
      (result) => result.roster_id != rosterId,
    ).points;

    if (teamPoints > opponentPoints) {
      wins = wins + 1;
    } else {
      losses = losses + 1;
    }
  }

  return {
    wins: wins,
    losses: losses,
  };
};
