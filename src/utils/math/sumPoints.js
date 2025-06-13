/**
 * @param {number} initialWeek - A semana para começar a soma (1 para temporada regular, 15 para os playoffs)
 * @param {number} lastWeek - A semana onde a soma deve parar (14 para a temporada regular, 17 para os playoffs)
 * @param {Array} weeklyResults - array contendo as matchups
 */
export const sumPointsFromResults = (initialWeek, lastWeek, weeklyResults) => {
  if (!Array.isArray(weeklyResults)) return 0; // garante que a entrada é um array

  // se for um array de arrays (várias temporadas), achata (se torna um array)
  // se já for plano, não muda nada
  const flat = weeklyResults.flat();

  let totalPoints = 0;
  for (let i = initialWeek - 1; i <= lastWeek - 1; i++) {
    totalPoints = totalPoints + flat[i].points;
  }

  // console.log(foundTeamResults);
  return totalPoints;
};
