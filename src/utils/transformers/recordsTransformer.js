export function transformRecords(seasonsData) {
  const topScores = [];
  const lowScores = [];
  const victories = [];
  const teamSeasonsPoints = {};
  const teamSeasonsWins = {};
  const positionScores = {
    qb: [],
    rb: [],
    wr: [],
    te: [],
    flex: [],
    k: [],
    def: [],
  };

  const positionMap = {
    0: 'qb',
    1: 'rb',
    2: 'rb',
    3: 'wr',
    4: 'wr',
    5: 'te',
    6: 'flex',
    7: 'k',
    8: 'def',
  };

  seasonsData.forEach((seasonObj) => {
    const season = seasonObj.season;

    seasonObj.matchups.forEach((week, weekIdx) => {
      const matchupsMap = {};
      week.forEach((team) => {
        if (!matchupsMap[team.matchup_id]) matchupsMap[team.matchup_id] = [];
        matchupsMap[team.matchup_id].push(team);
      });

      Object.values(matchupsMap).forEach((matchup) => {
        if (matchup.length !== 2) return;

        const [teamA, teamB] = matchup;

        [teamA, teamB].forEach((team) => {
          const opponent = team === teamA ? teamB : teamA;
          const scoreData = {
            season,
            week: weekIdx + 1,
            roster_id: team.roster_id,
            opponent_id: opponent.roster_id,
            points: team.points,
          };
          topScores.push(scoreData);
          lowScores.push(scoreData);

          team.starters.forEach((playerId, idx) => {
            const pos = positionMap[idx];
            if (!pos) return;
            const score = team.starters_points[idx];
            positionScores[pos].push({
              player_id: playerId,
              points: score,
              roster_id: team.roster_id,
              opponent_id: opponent.roster_id,
              season,
              week: weekIdx + 1,
            });
          });
        });

        const winner = teamA.points > teamB.points ? teamA : teamB;
        const loser = teamA.points > teamB.points ? teamB : teamA;
        if (winner.points !== loser.points) {
          // o cálculo abaixo usa a mesma fórmula dos reportes semanais do Sleeper para margem de vitória em %:
          // é calculada como a diferença de pontos entre o vencedor e o perdedor dividida pelos pontos do perdedor, multiplicada por 100
          const diff = winner.points - loser.points;
          const percDiff = (diff / loser.points) * 100;
          victories.push({
            season,
            week: weekIdx + 1,
            winner_id: winner.roster_id,
            loser_id: loser.roster_id,
            winner_points: winner.points,
            loser_points: loser.points,
            margin: percDiff,
          });
        }

        if (weekIdx < 14) {
          [teamA, teamB].forEach((team) => {
            const key = `${season}_${team.roster_id}`;
            if (!teamSeasonsPoints[key]) teamSeasonsPoints[key] = 0;
            teamSeasonsPoints[key] += team.points;
          });

          let matchWinner, matchLoser;
          if (teamA.points > teamB.points) {
            matchWinner = teamA;
            matchLoser = teamB;
          } else if (teamB.points > teamA.points) {
            matchWinner = teamB;
            matchLoser = teamA;
          }

          if (matchWinner) {
            const winKey = `${season}_${matchWinner.roster_id}`;
            const loseKey = `${season}_${matchLoser.roster_id}`;
            if (!teamSeasonsWins[winKey])
              teamSeasonsWins[winKey] = { w: 0, l: 0 };
            if (!teamSeasonsWins[loseKey])
              teamSeasonsWins[loseKey] = { w: 0, l: 0 };
            teamSeasonsWins[winKey].w++;
            teamSeasonsWins[loseKey].l++;
          }
        }
      });
    });
  });

  const sortDesc = (arr, key) => arr.sort((a, b) => b[key] - a[key]);
  const sortAsc = (arr, key) => arr.sort((a, b) => a[key] - b[key]);

  const top10Scores = sortDesc([...topScores], 'points').slice(0, 10);
  const low10Scores = sortAsc([...lowScores], 'points').slice(0, 10);

  const top10Victories = sortDesc([...victories], 'margin').slice(0, 10);
  const low10Victories = sortAsc([...victories], 'margin').slice(0, 10);

  const seasonPointsArr = Object.entries(teamSeasonsPoints).map(
    ([key, points]) => {
      const [season, roster_id] = key.split('_');
      return { season: +season, roster_id: +roster_id, points };
    },
  );
  const top10SeasonPoints = sortDesc([...seasonPointsArr], 'points').slice(
    0,
    10,
  );
  const low10SeasonPoints = sortAsc([...seasonPointsArr], 'points').slice(
    0,
    10,
  );

  const seasonWinsArr = Object.entries(teamSeasonsWins).map(([key, wl]) => {
    const [season, roster_id] = key.split('_');
    return {
      season: +season,
      roster_id: +roster_id,
      record: `${wl.w}-${wl.l}`,
      wins: wl.w,
    };
  });
  const top10SeasonWins = sortDesc([...seasonWinsArr], 'wins').slice(0, 10);
  const low10SeasonWins = sortAsc([...seasonWinsArr], 'wins').slice(0, 10);

  const positionTop10 = {};
  Object.entries(positionScores).forEach(([pos, arr]) => {
    positionTop10[pos] = sortDesc([...arr], 'points').slice(0, 10);
  });

  return {
    top_10_scores: top10Scores,
    low_10_scores: low10Scores,
    top_10_victories: top10Victories,
    low_10_victories: low10Victories,
    top_10_season_points: top10SeasonPoints,
    low_10_season_points: low10SeasonPoints,
    top_10_season_wins: top10SeasonWins,
    low_10_season_wins: low10SeasonWins,
    position_top_10: positionTop10,
  };
}
