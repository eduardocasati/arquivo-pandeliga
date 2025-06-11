const STORAGE_KEY = 'champion_team_data';

export const saveChampionTeamData = (championData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(championData));
};

export const getLocalChampionTeamData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    // pega as informações do campeão no local storage se existirem
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao parsear champion data do localStorage:', error);
    return null;
  }
};

// função para ser usada caso as informações do campeão sejam obsoletas
// TO DO: adicionar verificação da idade e obsolescência das informações
export const clearLocalChampionTeamData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
