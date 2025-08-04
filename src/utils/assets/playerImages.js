export function getPlayerImageUrl(playerId) {
  const id = Number(playerId);
  if (id === 0) {
    return 'https://sleepercdn.com/images/v2/icons/player_default.webp';
  }
  if (isNaN(id)) {
    // específico pra lidar com os times (defesas)
    return `https://sleepercdn.com/images/team_logos/nfl/${String(playerId).toLowerCase()}.png`;
  }
  return `https://sleepercdn.com/content/nfl/players/thumb/${id}.jpg`;
}
