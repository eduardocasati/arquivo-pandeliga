export function getTargetDate() {
  const timestamp = 1757031600000; // Data em Unix epoch
  return new Date(timestamp); // 1757031600000 = 4 de setembro de 2025, 20:20, fuso-horário de Cuiabá (GMT-4)
  // É possível pegar a data do draft de forma dinâmica na API do Sleeper pelo endpoint: https://api.sleeper.app/v1/draft/<draft_id>
  // O <draft_id> é encontrado em https://api.sleeper.app/v1/league/<league_id>
  // A data/hora do draft ("start_time") é retornada como uma timestamp Unix epoch (em milissegundos)
}
