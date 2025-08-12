import { createFileRoute } from '@tanstack/react-router';

import { HeadToHead } from '../pages';

export const Route = createFileRoute('/confrontos')({
  component: HeadToHead,
});
