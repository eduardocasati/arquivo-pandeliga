export function calculateTeamRecord(
  initialWeek,
  lastWeek,
  rosterId,
  weeklyMatchups,
) {
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
}
