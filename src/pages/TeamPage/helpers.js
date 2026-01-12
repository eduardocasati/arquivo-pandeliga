function isLastPlace(position, year) {
  if (year === 2020) return position === 6;
  if (year >= 2021 && year <= 2023) return position === 8;
  if (year >= 2024) return position === 10;
  return false;
}

function wentToPlayoffs(position, year) {
  return (year === 2020 && position <= 4) || (year >= 2021 && position <= 6);
}

function reachedFinal(position) {
  return position <= 2;
}

function wasChampion(position) {
  return position === 1;
}

function wentToShitBowl(position, year) {
  if (year === 2020) return position === 5 || position === 6;
  if (year >= 2021 && year <= 2023) return position === 7 || position === 8;
  if (year >= 2024) return position === 9 || position === 10;
  return false;
}

function lostShitBowl(position, year) {
  if (year === 2020) return position === 6;
  if (year >= 2021 && year <= 2023) return position === 8;
  if (year >= 2024) return position === 10;
  return false;
}

export function calculateTeamStats(teamHistory) {
  const stats = {
    best_finish: null,
    worst_finish: null,
    playoffs: { count: 0 },
    finals: { count: 0, years: [] },
    championship_wins: { count: 0, years: [] },
    shit_bowls: { count: 0, years: [] },
    shit_bowl_losses: { count: 0, years: [] },
  };

  teamHistory.forEach(({ year, position }) => {
    year = Number(year);
    if (position === null) return;

    const isLast = isLastPlace(position, year);

    // if (!stats.best_finish || position < stats.best_finish.position) {
    //   stats.best_finish = { position, year };
    // }
    if (!stats.best_finish || position < stats.best_finish.position) {
      stats.best_finish = {
        position,
        years: [year],
      };
    } else if (position === stats.best_finish.position) {
      stats.best_finish.years.push(year);
    }

    // if (!stats.worst_finish || position > stats.worst_finish.position) {
    //   stats.worst_finish = { position, year };
    // }
    if (isLast) {
      if (!stats.worst_finish || stats.worst_finish.position !== 'último') {
        stats.worst_finish = {
          position: 'último',
          years: [year],
        };
      } else {
        stats.worst_finish.years.push(year);
      }
    } else if (
      !stats.worst_finish ||
      (stats.worst_finish.position !== 'último' &&
        position > stats.worst_finish.position)
    ) {
      stats.worst_finish = {
        position,
        years: [year],
      };
    } else if (
      stats.worst_finish.position !== 'último' &&
      position === stats.worst_finish.position
    ) {
      stats.worst_finish.years.push(year);
    }

    if (wentToPlayoffs(position, year)) stats.playoffs.count++;

    if (reachedFinal(position))
      stats.finals.count++, stats.finals.years.push(year);

    if (wasChampion(position))
      stats.championship_wins.count++, stats.championship_wins.years.push(year);

    if (wentToShitBowl(position, year))
      stats.shit_bowls.count++, stats.shit_bowls.years.push(year);

    if (lostShitBowl(position, year))
      stats.shit_bowl_losses.count++, stats.shit_bowl_losses.years.push(year);
  });

  // depois que determina a pior posição aplica 'último' se necessário
  // if (
  //   stats.worst_finish &&
  //   isLastPlace(stats.worst_finish.position, stats.worst_finish.year)
  // ) {
  //   stats.worst_finish.position = 'último';
  // }

  return stats;
}
