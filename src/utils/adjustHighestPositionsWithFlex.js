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

export function adjustPositionTop10WithFlex(records) {
  const positionTop10 = records.position_top_10;
  const adjusted = {};

  for (const pos in positionTop10) {
    adjusted[pos] = [...positionTop10[pos]];
  }

  const allPlayersData = getFromLocalStorage(ALL_PLAYERS_DATA);

  if (!adjusted.flex) {
    delete adjusted.flex;
    return adjusted;
  }

  adjusted.flex.forEach((record) => {
    const player = allPlayersData[record.player_id];
    if (!player) return;

    const flexPlayerPosition = player.position;
    if (['RB', 'WR', 'TE'].includes(flexPlayerPosition)) {
      const posKey = flexPlayerPosition.toLowerCase();

      if (!adjusted[posKey]) adjusted[posKey] = [];

      const alreadyExists = adjusted[posKey].some(
        (r) => r.player_id === record.player_id,
      );
      if (!alreadyExists) {
        adjusted[posKey].push(record);

        adjusted[posKey] = adjusted[posKey]
          .sort((a, b) => b.points - a.points)
          .slice(0, 10);
      }
    }
  });

  delete adjusted.flex;

  return adjusted;
}
