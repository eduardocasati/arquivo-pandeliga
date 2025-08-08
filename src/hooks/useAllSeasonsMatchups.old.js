import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getAllSeasonsMatchups } from '../services/matchupsService.js';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage/localStorageUtils.js';

import { STORAGE_KEYS } from '../config/storageKeys.js';

const { ALL_SEASONS_MATCHUPS } = STORAGE_KEYS;

export const useAllSeasonsMatchups = () => {
  const cachedData = getFromLocalStorage(ALL_SEASONS_MATCHUPS);
  // TODO refatorar para usar onSuccess ao invés de estado
  const [allSeasonsMatchups, setAllSeasonsMatchups] = useState(
    cachedData || null,
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allSeasonsMatchups'],
    queryFn: getAllSeasonsMatchups,
    enabled: !cachedData,
  });

  useEffect(() => {
    if (!cachedData && data) {
      setAllSeasonsMatchups(data);
      saveToLocalStorage(ALL_SEASONS_MATCHUPS, data);
    }
  }, [data]);

  return {
    allSeasonsMatchups,
    isLoading,
    isError,
    error,
  };
};
