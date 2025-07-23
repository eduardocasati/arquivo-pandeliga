import { useMemo } from 'react';

import { getFromLocalStorage } from '../../../utils/storage/localStorageUtils';

import { STORAGE_KEYS } from '../../../constants/storageKeys';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

const abbreviateName = (fullName) => {
  if (typeof fullName !== 'string') return ''; // retorna vazio se não for string

  const parts = fullName.trim().split(/\s+/); // remove espaços extras e divide pelo espaço

  if (parts.length === 1) {
    // se só tiver um nome, retorna o nome completo
    return parts[0];
  }

  const firstInitial = parts[0][0].toUpperCase(); // primeira letra maiúscula do primeiro nome
  const lastName = parts.slice(1).join(' '); // junta todas as palavras após o primeiro nome

  return `${firstInitial}. ${lastName}`;
};

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
