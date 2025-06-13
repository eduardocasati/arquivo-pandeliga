// TODO ajustar o código para receber as informações de utils/processors/championProcessor/processChampionData.js

// import { useQuery } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';

// import { getCurrentChampionData } from '../services/championService.js';
// import { processChampionData } from '../utils/processors/championProcessor.js';
// import {
//   getFromLocalStorage,
//   saveToLocalStorage,
// } from '../utils/storage/localStorageUtils.js';

// import { STORAGE_KEYS } from '../constants/storageKeys.js';

// const { CHAMPION_DATA } = STORAGE_KEYS;

// export const useChampionData = () => {
//   const [championData, setChampionData] = useState(null);
//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ['championData'],
//     queryFn: getCurrentChampionData,
//     enabled: false, // começa sem fazer o fetch getCurrentChampionData
//   });

//   useEffect(() => {
//     const cachedData = getFromLocalStorage(CHAMPION_DATA); // busca os dados do campeão no local storage
//     if (!cachedData) {
//       refetch().then((response) => {
//         if (response.status === 'success') {
//           saveToLocalStorage(CHAMPION_DATA, data);
//         }
//       });
//     }

//     const processedChampionData = processChampionData(data);
//     setChampionData(processedChampionData);
//   }, []);

//   return { championData, isLoading };
// };
