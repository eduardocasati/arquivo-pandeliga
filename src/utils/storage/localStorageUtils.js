export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  const raw = localStorage.getItem(key);
  try {
    // pega as informações do local storage se existirem
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Erro ao parsear os dados da chave '${key}`, error);
    return null;
  }
};

// TODO: adicionar verificação da idade e obsolescência das informações
export const clearLocalStorageKey = (key) => {
  localStorage.removeItem(key);
};
