import { useMemo } from 'react';

import { abbreviateName } from '../../../utils/formatters/playerNameFormat';
import { getFromLocalStorage } from '../../../utils/localStorage/localStorageUtils';

import { STORAGE_KEYS } from '../../../config/storageKeys';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

export const usePlayerNames = (starters = []) => {
  const allPlayersData = getFromLocalStorage(ALL_PLAYERS_DATA);

  const playerNames = useMemo(() => {
    if (!Array.isArray(starters) || !allPlayersData) return [];

    return starters.map((playerId) => {
      if (Number(playerId) === 0) {
        return '(vazio)'; // ID 0 significa que não havia um jogador escalado
      }

      const player = allPlayersData[playerId];
      if (player && player.full_name) {
        return abbreviateName(player.full_name);
      }
      return playerId;
    });
  }, [starters, allPlayersData]);

  return playerNames;
};
