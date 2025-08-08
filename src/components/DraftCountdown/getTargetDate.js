// Define a data e horário do início do draft da liga
export function getTargetDate() {
  const timestamp = 1755907200000; // Data do draft em Unix epoch
  return new Date(timestamp); // 1755907200000 = "22 Aug 2025 20:00:00 GMT-4" (Cuiabá)
  // É possível pegar a data do draft de forma dinâmica na API do Sleeper pelo endpoint: https://api.sleeper.app/v1/draft/<draft_id>
  // O <draft_id> é encontrado em https://api.sleeper.app/v1/league/<league_id>
  // A data/hora do draft ("start_time") é retornada como uma timestamp Unix epoch (em milissegundos)
}
