import { useMemo } from 'react';

import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups';
import { transformRecords } from '../../utils/transformers/recordsTransformer';

export const useRecords = () => {
  const { data, isLoading } = useAllSeasonsMatchups();
  const allSeasonsMatchups = data?.allSeasonsMatchups;

  const records = useMemo(() => {
    if (!allSeasonsMatchups) return null;
    return transformRecords(allSeasonsMatchups);
  }, [allSeasonsMatchups]);

  return { records, isLoading };
};
