import { createFileRoute } from '@tanstack/react-router';

import { Champions } from '../pages';

export const Route = createFileRoute('/campeoes')({
  component: Champions,
});
