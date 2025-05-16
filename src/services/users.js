// Busca o roster ID do atual campeão da liga
export const getLatestLeagueWinnerRosterId = async () => {
  const response = await fetch(
    `https://api.sleeper.app/v1/league/1181787756111253504`,
  );
  const data = await response.json();

  const latestLeagueWinnerRosterId =
    data.metadata.latest_league_winner_roster_id;

  return latestLeagueWinnerRosterId;
};

// Busca o owner ID do atual campeão da liga
export const getLatestLeagueWinnerOwnerId = async () => {
  const rosterId = await getLatestLeagueWinnerRosterId();

  const response = await fetch(
    `https://api.sleeper.app/v1/league/1181787756111253504/rosters`,
  );
  const data = await response.json();

  const findOwnerId = data.find(
    (roster) => roster.metadata.roster_id == rosterId,
  );

  return findOwnerId.metadata.owner_id;
};

const getLatestLeagueWinnerTeamName = async () => {
  const ownerId = await getLatestLeagueWinnerOwnerId();

  const response = await fetch(
    `https://api.sleeper.app/v1/league/1181787756111253504/users`,
  );
  const data = await response.json();

  const teamName = data.find((owner) => owner.user_id === ownerId);

  return teamName.metadata.team_name;
};
