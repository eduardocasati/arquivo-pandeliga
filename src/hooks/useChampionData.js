// TODO ajustar o código para receber as informações de utils/processors/championProcessor/processChampionData.js

import { useQuery } from '@tanstack/react-query';

import { processChampionData } from '../utils/processors/championProcessor.js';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../utils/storage/localStorageUtils.js';

import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';

const { CHAMPION_DATA } = STORAGE_KEYS;

export const useChampionData = () => {
  const cachedData = getFromLocalStorage(CHAMPION_DATA);
  const [championData, setChampionData] = useState(cachedData || null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['championData'],
    queryFn: processChampionData,
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
