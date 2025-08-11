export function transformAllTeamsHistoricalStats(allSeasonsMatchups) {
  const statsByTeam = {};

  allSeasonsMatchups.forEach(({ season, matchups }) => {
    const teamsPlayedThisSeason = new Set();

    // percorre as semanas, ignorando as 15, 16, 17 (index 14,15,16)
    matchups.forEach((week, weekIndex) => {
      if (weekIndex >= 14) return; // pula semanas 15,16,17

      week.forEach((matchup) => {
        const rosterId = matchup.roster_id;
        const points = matchup.points;

        if (!statsByTeam[rosterId]) {
          statsByTeam[rosterId] = {
            wins: 0,
            losses: 0,
            totalPoints: 0,
            totalGames: 0,
            seasonsPlayed: 0,
          };
        }

        teamsPlayedThisSeason.add(rosterId);

        statsByTeam[rosterId].totalPoints += points;
        statsByTeam[rosterId].totalGames += 1;
      });

      // contabiliza vitórias e derrotas depois de acumular pontos para a semana
      // para cada matchup_id na semana, encontra os dois times e compara pontos
      const matchupIds = [...new Set(week.map((m) => m.matchup_id))];
      matchupIds.forEach((matchupId) => {
        const results = week.filter((m) => m.matchup_id === matchupId);
        if (results.length !== 2) return; // só considera se houver os dois times

        const [teamA, teamB] = results;
        if (teamA.points > teamB.points) {
          statsByTeam[teamA.roster_id].wins += 1;
          statsByTeam[teamB.roster_id].losses += 1;
        } else if (teamB.points > teamA.points) {
          statsByTeam[teamB.roster_id].wins += 1;
          statsByTeam[teamA.roster_id].losses += 1;
        }
      });
    });

    // após processar a temporada inteira, conta as temporadas jogadas
    teamsPlayedThisSeason.forEach((rosterId) => {
      statsByTeam[rosterId].seasonsPlayed += 1;
    });
  });

  return statsByTeam;
}
