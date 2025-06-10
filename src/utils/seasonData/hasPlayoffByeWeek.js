export const hasPlayoffByeWeek = (data) => {
  // if (!Array.isArray(data)) return 0; // garante que a entrada é um array

  // se matchup_id da primeira partida dos playoffs (índice 0) é null, bye = true
  const hadByeWeek = data[0].matchup_id === null ? true : false;

  return hadByeWeek;
};
