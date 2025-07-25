export function hasByeWeekInPlayoffs(results) {
  // semana 15 = índice 14
  return results[14].matchup_id === null;
}
