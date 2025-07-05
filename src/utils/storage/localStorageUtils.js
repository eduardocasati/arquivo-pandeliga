export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage(key) {
  const raw = localStorage.getItem(key);
  return JSON.parse(raw);
}

// TODO: adicionar verificação da idade e obsolescência das informações
export function clearLocalStorageKey(key) {
  localStorage.removeItem(key);
}
