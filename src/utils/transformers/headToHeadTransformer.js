import { formatToBRDecimal } from '../formatters/numberFormat';
import { sumTeamTotalPoints } from '../stats/sumTeamTotalPoints';

export function transformHeadToHeadStats(
  firstTeamRosterId,
  secondTeamRosterId,
  data,
) {
  // isola os resultados de cada time para somar suas pontuações totais
  const results = data.flatMap(
    (headToHeadMatchups) => headToHeadMatchups.matchup,
  ); // isola apenas a chave matchup de cada índice e transforma em um array só
  const firstTeamResults = results.filter(
    (result) => result.roster_id === firstTeamRosterId,
  );
  const secondTeamResults = results.filter(
    (result) => result.roster_id === secondTeamRosterId,
  );
  const firstTeamTotalPoints = sumTeamTotalPoints(firstTeamResults);
  const secondTeamTotalPoints = sumTeamTotalPoints(secondTeamResults);

  // calcula a quantidade de vitórias de cada time
  let firstTeamWins = 0;
  let secondTeamWins = 0;
  data.forEach((weeklyMatchup) => {
    const { matchup } = weeklyMatchup;
    const firstTeamResult = matchup.find(
      (result) => result.roster_id === firstTeamRosterId,
    );
    const secondTeamResult = matchup.find(
      (result) => result.roster_id === secondTeamRosterId,
    );
    firstTeamResult.points > secondTeamResult.points
      ? (firstTeamWins = firstTeamWins + 1)
      : (secondTeamWins = secondTeamWins + 1);
  });

  // calcula a porcentagem de vitórias de cada time
  const totalGames = data.length;
  const firstTeamWinPercentage = (firstTeamWins / totalGames) * 100;
  const secondTeamWinPercentage = (secondTeamWins / totalGames) * 100;

  return {
    firstTeamTotalPoints: formatToBRDecimal(firstTeamTotalPoints),
    firstTeamWins: firstTeamWins,
    firstTeamWinPercentage: Math.round(firstTeamWinPercentage),
    secondTeamTotalPoints: formatToBRDecimal(secondTeamTotalPoints),
    secondTeamWins: secondTeamWins,
    secondTeamWinPercentage: Math.round(secondTeamWinPercentage),
  };
}
