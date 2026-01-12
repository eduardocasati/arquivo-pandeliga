import { useQuery } from '@tanstack/react-query';

import { getDraftDate } from '../../services/leagueService';

export function useDraftDate() {
  return useQuery({
    queryKey: ['draft-date'],
    queryFn: async () => {
      const timestamp = await getDraftDate();
      return new Date(timestamp);
    },
    staleTime: Infinity, // nunca fica "stale"
    cacheTime: Infinity, // nunca sai do cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
