export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  const raw = localStorage.getItem(key);
  return JSON.parse(raw);
};

// TODO: adicionar verificação da idade e obsolescência das informações
export const clearLocalStorageKey = (key) => {
  localStorage.removeItem(key);
};
