import { getAllLeagues } from '../services/leagueService';

import staticChampions from '../constants/champions';

export async function getChampionsList() {
  const allLeaguesData = await getAllLeagues();

  const latestSeason = Math.max(
    ...allLeaguesData.map((league) => Number(league.season)),
  );

  const champions = allLeaguesData.reduce((acc, league) => {
    const year = Number(league.season);

    // ignora o ano mais recente
    if (year === latestSeason) return acc;

    const rosterId = league.metadata.latest_league_winner_roster_id;
    acc[year] = { roster_id: Number(rosterId) };

    return acc;
  }, {});

  const championsList = {
    ...staticChampions,
    ...champions,
  };

  return championsList;
}
