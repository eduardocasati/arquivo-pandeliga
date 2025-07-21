const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000; // 24h em milissegundos

export function saveToLocalStorage(key, data, maxAgeInMs = DEFAULT_MAX_AGE) {
  const payload = {
    data,
    timestamp: Date.now(),
    maxAgeInMs,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getFromLocalStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const { data, timestamp, maxAgeInMs } = JSON.parse(raw);

  if (maxAgeInMs && Date.now() - timestamp > maxAgeInMs) {
    localStorage.removeItem(key); // limpa dados expirados
    return null;
  }

  return data;
}
