import { getFromLocalStorage } from './localStorage/localStorageUtils';

import { STORAGE_KEYS } from '../config/storageKeys';

const { ALL_PLAYERS_DATA } = STORAGE_KEYS;

export function adjustHighestPositionsWithFlex(highestPositionPoints) {
  const allPlayersData = getFromLocalStorage(ALL_PLAYERS_DATA);
  const flexPlayerId = highestPositionPoints.flex.player_id;
  const flexPlayerPosition =
    allPlayersData[flexPlayerId].position.toLowerCase();

  const adjusted = { ...highestPositionPoints };

  if (
    adjusted[flexPlayerPosition] &&
    adjusted.flex.points > adjusted[flexPlayerPosition].points
  ) {
    adjusted[flexPlayerPosition] = adjusted.flex;
  }

  delete adjusted.flex;

  return adjusted;
}
