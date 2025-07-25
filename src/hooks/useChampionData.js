import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage/localStorageUtils.js';
import { transformChampionData } from '../utils/transformers/championTransformer.js';

import { STORAGE_KEYS } from '../constants/storageKeys.js';

const { CHAMPION_DATA } = STORAGE_KEYS;

export const useChampionData = () => {
  const cachedData = getFromLocalStorage(CHAMPION_DATA);
  // TODO refatorar para usar onSuccess ao invés de estado
  const [championData, setChampionData] = useState(cachedData || null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['championData'],
    queryFn: transformChampionData,
    enabled: !cachedData,
  });

  useEffect(() => {
    if (!cachedData && data) {
      setChampionData(data);
      saveToLocalStorage(CHAMPION_DATA, data);
    }
  }, [data]);

  return {
    championData,
    isLoading,
    isError,
    error,
  };
};
