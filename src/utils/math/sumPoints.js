export const sumPointsFromMatchups = (data) => {
  if (!Array.isArray(data)) return 0; // garante que a entrada é um array

  // se for um array de arrays (várias temporadas), achata (se torna um array)
  // se já for plano, não muda nada
  const flat = data.flat();

  const totalPoints = flat.reduce(
    (total, match) => total + (match.points || 0),
    0,
  );

  return totalPoints;
};
