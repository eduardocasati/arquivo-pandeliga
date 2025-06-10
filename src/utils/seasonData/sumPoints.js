export const sumPoints = (data) => {
  if (!Array.isArray(data)) return 0; // garante que a entrada é um array

  // se for um array de arrays (várias temporadas), achata (se torna um array)
  // se já for plano, não muda nada
  const flatMatches = data.flat();

  const totalPoints = flatMatches.reduce(
    (total, match) => total + (match.points || 0),
    0,
  );

  return totalPoints;
};
