import { createFileRoute } from '@tanstack/react-router';

import { HistoricalStandings } from '../pages';

export const Route = createFileRoute('/classificacao')({
  component: HistoricalStandings,
});
