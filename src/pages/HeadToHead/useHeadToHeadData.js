import { useQuery } from '@tanstack/react-query';

import { getSimplifiedPlayers } from '../../data/getSimplifiedPlayers';
import { getAllSeasonsMatchups } from '../../services/matchupsService';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage/localStorageUtils';

import { STORAGE_KEYS } from '../../config/storageKeys';

const { ALL_SEASONS_MATCHUPS, ALL_PLAYERS_DATA } = STORAGE_KEYS;

export const useHeadToHeadData = () => {
  const cachedMatchups = getFromLocalStorage(ALL_SEASONS_MATCHUPS);
  const cachedPlayers = getFromLocalStorage(ALL_PLAYERS_DATA);

  return useQuery({
    queryKey: ['headToHeadData'],
    queryFn: async () => {
      const [matchups, players] = await Promise.all([
        cachedMatchups ?? getAllSeasonsMatchups(),
        cachedPlayers ?? getSimplifiedPlayers(),
      ]);

      if (!cachedMatchups) {
        saveToLocalStorage(ALL_SEASONS_MATCHUPS, matchups);
      }

      if (!cachedPlayers) {
        saveToLocalStorage(ALL_PLAYERS_DATA, players);
      }

      return {
        allSeasonsMatchups: matchups,
        filteredPlayers: players,
      };
    },
    initialData:
      cachedMatchups && cachedPlayers
        ? {
            allSeasonsMatchups: cachedMatchups,
            filteredPlayers: cachedPlayers,
          }
        : undefined,
  });
};
