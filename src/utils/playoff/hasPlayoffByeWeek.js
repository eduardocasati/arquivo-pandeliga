export const hasByeWeekInPlayoffs = (data) => {
  // if (!Array.isArray(data)) return 0; // garante que a entrada é um array

  // se matchup_id da primeira partida dos playoffs (semana 15 = índice 14) é null, bye = true
  const hadByeWeek = data[14].matchup_id === null ? true : false;

  return hadByeWeek;
};

// export const hasByeWeekInPlayoffs = (matchups) => {
//   // semana 15 = índice 14
//   return matchups[14]?.matchup_id === null;
// };
