import { fetchAllPlayersData } from '../api/sleeperApi.js';

// PEGA AS INFORMAÇÕES DE TODOS OS JOGADORES E FILTRA APENAS OS DADOS DESNECESSÁRIOS
export async function getFilteredPlayersData() {
  const allPlayers = await fetchAllPlayersData();

  const filteredPlayers = Object.entries(allPlayers).reduce(
    (acc, [id, player]) => {
      acc[id] = {
        player_id: player.player_id,
        full_name: player.full_name,
        first_name: player.first_name,
        last_name: player.last_name,
        position: player.position,
        number: player.number,
        team: player.team,
      };
      return acc;
    },
    {},
  );

  return filteredPlayers;
}
