export function sumTeamTotalPoints(results) {
  if (!Array.isArray(results)) return 0;

  const flat = results.flat(); // se certifica que é um array só

  const totalPoints = flat.reduce((sum, result) => sum + result.points, 0);

  return totalPoints;
}
