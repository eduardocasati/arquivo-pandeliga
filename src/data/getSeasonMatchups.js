import { fetchMatchups } from '../api/sleeperApi.js';

const STATIC_SEASONS_WEEKS = {
  2020: 16,
  2021: 17,
};

const allFiles = import.meta.glob(
  '/src/constants/nfl-fantasy-scraped-data/*/matchups/week-*.json',
  { eager: true },
);

// console.log('✔️ MATCHUP FILES FOUND:', Object.keys(allFiles));

/**
 * PEGA TODOS OS MATCHUPS DE UMA TEMPORADA
 * cada array com arrays, onde cada array contém todos os resultados da semana
 * @returns {Array<Array<Object>>}
 */
export async function getSeasonMatchups(leagueId) {
  const numberOfWeeks = 17;
  const matchupPromises = [];

  for (let i = 1; i <= numberOfWeeks; i++) {
    matchupPromises.push(fetchMatchups(leagueId, i.toString()));
  }

  const matchups = await Promise.all(matchupPromises);

  return matchups;
}

export async function loadStaticSeasonMatchups() {
  const seasonPromises = Object.entries(STATIC_SEASONS_WEEKS).map(
    async ([season, weekCount]) => {
      const weekPromises = [];

      for (let i = 1; i <= weekCount; i++) {
        const weekStr = i.toString().padStart(2, '0');
        const path = `/src/constants/nfl-fantasy-scraped-data/${season}/matchups/week-${weekStr}.json`;

        const matchupData = allFiles[path]?.default || [];
        weekPromises.push(matchupData);
      }

      const weeklyMatchups = await Promise.all(weekPromises);

      return {
        season,
        matchups: weeklyMatchups,
      };
    },
  );

  return Promise.all(seasonPromises);
}

export async function mergeStaticWithApiData(apiData) {
  const staticData = await loadStaticSeasonMatchups();

  const seasonMap = new Map();

  staticData.forEach((seasonEntry) => {
    seasonMap.set(seasonEntry.season, seasonEntry);
  });

  apiData.forEach((seasonEntry) => {
    seasonMap.set(seasonEntry.season, seasonEntry);
  });

  return Array.from(seasonMap.values());
}
