import { useMemo } from 'react';

import { getFromLocalStorage } from '../../../utils/storage/localStorageUtils';

import { STORAGE_KEYS } from '../../../constants/storageKeys';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

export const usePlayerNames = (starters = []) => {
  const allPlayersData = getFromLocalStorage(ALL_PLAYERS_DATA);

  const playerNames = useMemo(() => {
    if (!Array.isArray(starters) || !allPlayersData) return [];

    return starters.map((playerId) => {
      const player = allPlayersData[playerId];
      return player ? player.full_name : playerId;
    });
  }, [starters, allPlayersData]);

  return playerNames;
};
