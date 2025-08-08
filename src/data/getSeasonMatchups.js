import { fetchMatchups } from '../api/sleeperApi.js';

const STATIC_SEASONS_WEEKS = {
  2020: 16,
  2021: 17,
};

const allFiles = import.meta.glob(
  '/src/constants/nfl-fantasy-scraped-data/*/matchups/week-*.json',
  { eager: true },
);

// PEGA TODOS OS MATCHUPS DE UMA TEMPORADA
export async function getSeasonMatchups(leagueId) {
  const numberOfWeeks = 17;
  const matchupPromises = [];

  for (let i = 1; i <= numberOfWeeks; i++) {
    matchupPromises.push(fetchMatchups(leagueId, i.toString()));
  }

  const matchups = await Promise.all(matchupPromises);

  return matchups;
}

// FUNÇÕES QUE FAZEM A UNIÃO DOS DADOS DA API COM OS ESTÁTICOS
export function loadStaticSeasonMatchups() {
  return Object.entries(STATIC_SEASONS_WEEKS).map(([season, weekCount]) => {
    const weeklyMatchups = [];

    for (let i = 1; i <= weekCount; i++) {
      const weekStr = i.toString().padStart(2, '0');
      const path = `/src/constants/nfl-fantasy-scraped-data/${season}/matchups/week-${weekStr}.json`;
      weeklyMatchups.push(allFiles[path]?.default || []);
    }

    return {
      season,
      matchups: weeklyMatchups,
    };
  });
}
export function mergeStaticWithApiData(apiData) {
  const staticData = loadStaticSeasonMatchups();
  const seasonMap = new Map();

  // insere dados estáticos
  staticData.forEach((seasonEntry) => {
    seasonMap.set(seasonEntry.season, seasonEntry);
  });

  // sobrescreve com dados da API
  apiData.forEach((seasonEntry) => {
    seasonMap.set(seasonEntry.season, seasonEntry);
  });

  return Array.from(seasonMap.values()).sort(
    (a, b) => Number(b.season) - Number(a.season),
  );
}
