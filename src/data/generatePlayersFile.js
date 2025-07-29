import { writeFile } from 'fs/promises';
import { getSimplifiedPlayers } from './getSimplifiedPlayers.js';

async function generateFile() {
  try {
    const players = await getSimplifiedPlayers();
    await writeFile('simplifiedPlayers.json', JSON.stringify(players, null, 2));
    console.log('Arquivo "simplifiedPlayers.json" criado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar o arquivo:', error);
  }
}
