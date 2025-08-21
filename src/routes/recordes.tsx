import { createFileRoute } from '@tanstack/react-router';

import { Records } from '../pages';

export const Route = createFileRoute('/recordes')({
  component: Records,
});
