import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getChampionsList } from '../../data/getChampionsList';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage/localStorageUtils';

import { STORAGE_KEYS } from '../../config/storageKeys';

const { CHAMPIONS_LIST } = STORAGE_KEYS;

export const useChampionsList = () => {
  const cachedData = getFromLocalStorage(CHAMPIONS_LIST);

  const [championsList, setChampionsList] = useState(cachedData || null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['championsList'],
    queryFn: getChampionsList,
    enabled: !cachedData,
  });

  useEffect(() => {
    if (!cachedData && data) {
      setChampionsList(data);
      saveToLocalStorage(CHAMPIONS_LIST, data);
    }
  }, [data]);

  return { championsList, isLoading };
};
