export function sumWeeklyPoints(initialWeek, lastWeek, weeklyResults) {
  if (!Array.isArray(weeklyResults)) return 0; // garante que a entrada é um array

  // se for um array de arrays (várias temporadas), achata (se torna um array)
  // se já for plano, não muda nada
  const flat = weeklyResults.flat();

  let totalPoints = 0;
  for (let i = initialWeek - 1; i <= lastWeek - 1; i++) {
    totalPoints = totalPoints + flat[i].points;
  }

  return totalPoints;
}
