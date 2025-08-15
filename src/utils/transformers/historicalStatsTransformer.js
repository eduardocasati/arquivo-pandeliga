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
            total_points: 0,
            total_games: 0,
            seasons_played: 0,
          };
        }

        teamsPlayedThisSeason.add(rosterId);

        statsByTeam[rosterId].total_points += points;
        statsByTeam[rosterId].total_games += 1;
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
      statsByTeam[rosterId].seasons_played += 1;
    });
  });

  return statsByTeam;
}

export function transformHistoricalStatsForSingleTeam(
  allSeasonsMatchups,
  rosterIdToAnalyze,
) {
  const stats = {
    total_points: 0,
    total_games: 0,
    wins: 0,
    losses: 0,
    seasons_played: 0,
    highest_single_game: null,
    lowest_single_game: null,
    highest_season_points: null,
    lowest_season_points: null,
    highest_season_record: null,
    lowest_season_record: null,
    highest_position_points: {
      qb: null,
      rb: null,
      wr: null,
      te: null,
      flex: null,
      k: null,
      def: null,
    },
    win_percentage: null,
    points_per_season: null,
    points_per_game: null,
    best_season: null,
    worst_season: null,
  };

  allSeasonsMatchups.forEach(({ season, matchups }) => {
    let seasonPoints = 0;
    let seasonWins = 0;
    let seasonLosses = 0;
    let playedThisSeason = false;

    matchups.forEach((week, weekIndex) => {
      const teamMatchup = week.find(
        (m) => m.roster_id === rosterIdToAnalyze && m.matchup_id != null,
      );
      if (!teamMatchup) return;

      // temporada regular
      if (weekIndex < 14) {
        playedThisSeason = true;
        const points = teamMatchup.points;
        stats.total_points += points;
        stats.total_games += 1;
        seasonPoints += points;
      }

      const points = teamMatchup.points;
      const opponent = week.find(
        (m) =>
          m.matchup_id === teamMatchup.matchup_id &&
          m.roster_id !== rosterIdToAnalyze,
      );

      if (
        !stats.highest_single_game ||
        points > stats.highest_single_game.points
      ) {
        stats.highest_single_game = {
          points,
          year: season,
          week: weekIndex + 1,
          matchup_id: teamMatchup.matchup_id,
          opponent_roster_id: opponent?.roster_id,
        };
      }
      if (
        !stats.lowest_single_game ||
        points < stats.lowest_single_game.points
      ) {
        stats.lowest_single_game = {
          points,
          year: season,
          week: weekIndex + 1,
          matchup_id: teamMatchup.matchup_id,
          opponent_roster_id: opponent?.roster_id,
        };
      }
    });

    if (!playedThisSeason) return;

    stats.seasons_played += 1;

    // vitórias/derrotas temporada regular
    matchups.forEach((week, weekIndex) => {
      if (weekIndex >= 14) return;

      const matchupIds = [...new Set(week.map((m) => m.matchup_id))];
      matchupIds.forEach((matchupId) => {
        const results = week.filter((m) => m.matchup_id === matchupId);
        if (results.length !== 2) return;

        const [teamA, teamB] = results;
        if (
          teamA.roster_id === rosterIdToAnalyze ||
          teamB.roster_id === rosterIdToAnalyze
        ) {
          if (
            teamA.roster_id === rosterIdToAnalyze &&
            teamA.points > teamB.points
          )
            stats.wins += 1;
          else if (
            teamB.roster_id === rosterIdToAnalyze &&
            teamB.points > teamA.points
          )
            stats.wins += 1;
          else stats.losses += 1;

          if (
            teamA.roster_id === rosterIdToAnalyze &&
            teamA.points > teamB.points
          )
            seasonWins += 1;
          else if (
            teamB.roster_id === rosterIdToAnalyze &&
            teamB.points > teamA.points
          )
            seasonWins += 1;
          else seasonLosses += 1;
        }
      });
    });

    // maior/menor pontuação temporada
    if (
      !stats.highest_season_points ||
      seasonPoints > stats.highest_season_points.points
    ) {
      stats.highest_season_points = { points: seasonPoints, year: season };
    }
    if (
      !stats.lowest_season_points ||
      seasonPoints < stats.lowest_season_points.points
    ) {
      stats.lowest_season_points = { points: seasonPoints, year: season };
    }

    // maior/menor recorde temporada
    if (
      !stats.highest_season_record ||
      seasonWins > stats.highest_season_record.wins
    ) {
      stats.highest_season_record = {
        wins: seasonWins,
        losses: seasonLosses,
        year: season,
      };
    }
    if (
      !stats.lowest_season_record ||
      seasonWins < stats.lowest_season_record.wins
    ) {
      stats.lowest_season_record = {
        wins: seasonWins,
        losses: seasonLosses,
        year: season,
      };
    }

    // melhor temporada
    // const seasonWinPercent = (seasonWins / (seasonWins + seasonLosses)) * 100;
    if (
      !stats.best_season ||
      seasonWins > stats.best_season.wins ||
      (seasonWins === stats.best_season.wins &&
        seasonLosses < stats.best_season.losses)
    ) {
      stats.best_season = {
        record: `${seasonWins}-${seasonLosses}`,
        // win_percentage: seasonWinPercent,
        year: season,
        wins: seasonWins,
        losses: seasonLosses,
      };
    }

    // pior temporada
    if (
      !stats.worst_season ||
      seasonWins < stats.worst_season.wins ||
      (seasonWins === stats.worst_season.wins &&
        seasonLosses > stats.worst_season.losses)
    ) {
      stats.worst_season = {
        record: `${seasonWins}-${seasonLosses}`,
        // win_percentage: seasonWinPercent,
        year: season,
        wins: seasonWins,
        losses: seasonLosses,
      };
    }

    // maiores pontuações por posição
    matchups.forEach((week, weekIndex) => {
      const teamMatchup = week.find(
        (m) => m.roster_id === rosterIdToAnalyze && m.matchup_id != null,
      );
      if (!teamMatchup) return;

      const sp = teamMatchup.starters_points;
      const posPoints = {
        qb: sp[0],
        rb: Math.max(sp[1], sp[2]),
        wr: Math.max(sp[3], sp[4]),
        te: sp[5],
        flex: sp[6],
        k: sp[7],
        def: sp[8],
      };

      const opponent = week.find(
        (m) =>
          m.matchup_id === teamMatchup.matchup_id &&
          m.roster_id !== rosterIdToAnalyze,
      );

      Object.entries(posPoints).forEach(([pos, points]) => {
        if (
          !stats.highest_position_points[pos] ||
          points > stats.highest_position_points[pos].points
        ) {
          let playerIndex;
          switch (pos) {
            case 'qb':
              playerIndex = 0;
              break;
            case 'rb':
              playerIndex = sp[1] > sp[2] ? 1 : 2;
              break;
            case 'wr':
              playerIndex = sp[3] > sp[4] ? 3 : 4;
              break;
            case 'te':
              playerIndex = 5;
              break;
            case 'flex':
              playerIndex = 6;
              break;
            case 'k':
              playerIndex = 7;
              break;
            case 'def':
              playerIndex = 8;
              break;
          }

          stats.highest_position_points[pos] = {
            points,
            year: season,
            week: weekIndex + 1,
            matchup_id: teamMatchup.matchup_id,
            opponent_roster_id: opponent?.roster_id,
            player_id: teamMatchup.starters[playerIndex],
          };
        }
      });
    });
  });

  stats.win_percentage = (stats.wins / stats.total_games) * 100;
  stats.points_per_season = stats.total_points / stats.seasons_played;
  stats.points_per_game = stats.total_points / stats.total_games;

  // limpa wins/losses internos de best/worst
  if (stats.best_season) {
    delete stats.best_season.wins;
    delete stats.best_season.losses;
  }
  if (stats.worst_season) {
    delete stats.worst_season.wins;
    delete stats.worst_season.losses;
  }

  return stats;
}
