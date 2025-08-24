export function getTop10Players(players) {
  const allPlayers = Object.values(players).flat();

  const top10 = allPlayers.sort((a, b) => b.points - a.points).slice(0, 10);

  return top10;
}
