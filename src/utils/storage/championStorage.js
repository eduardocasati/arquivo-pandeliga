const STORAGE_KEY = 'champion_team_info';

export const saveChampionTeamInfo = (championInfo) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(championInfo));
};

export const getLocalChampionTeamInfo = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    // pega as informações do campeão no local storage se existirem
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao parsear champion info do localStorage:', error);
    return null;
  }
};

// função para ser usada caso as informações do campeão sejam obsoletas
// TO DO: adicionar verificação da idade e obsolescência das informações
export const clearLocalChampionTeamInfo = () => {
  localStorage.removeItem(STORAGE_KEY);
};
