import { useEffect, useState } from 'react';

import { getFromLocalStorage } from '../../../utils/storage/localStorageUtils';

export const useVisiblePlayers = (playerIds) => {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    if (!playerIds || playerIds.length === 0) return;

    const allPlayers = getFromLocalStorage('playersData');
    if (!allPlayers) {
      setPlayers({});
      return;
    }

    const filtered = {};

    playerIds.forEach((id) => {
      if (allPlayers[id]) {
        filtered[id] = { full_name: allPlayers[id].full_name };
      }
    });

    setPlayers(filtered);
  }, [playerIds.join(',')]);

  return players;
};
