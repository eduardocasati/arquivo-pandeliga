import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { HeadToHead, HistoricalStandings, Home, Records } from './pages';

// Rota raiz (usada como wrapper)
const rootRoute = createRootRoute({
  component: Outlet,
});

// Rota Home
const homeRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: Home,
});

const headToHeadRoute = createRoute({
  path: '/confrontos',
  getParentRoute: () => rootRoute,
  component: HeadToHead,
});

const recordsRoute = createRoute({
  path: '/recordes',
  getParentRoute: () => rootRoute,
  component: Records,
});

const historicalStandingsRoute = createRoute({
  path: '/classificacao',
  getParentRoute: () => rootRoute,
  component: HistoricalStandings,
});

// const seasonsRoute = createRoute({
//   path: '/temporadas',
//   getParentRoute: () => rootRoute,
//   component: Seasons,
// });

// const trophyRoomRoute = createRoute({
//   path: '/trofeus',
//   getParentRoute: () => rootRoute,
//   component: TrophyRoom,
// });

// Monta árvore de rotas
const routeTree = rootRoute.addChildren([
  homeRoute,
  headToHeadRoute,
  recordsRoute,
  historicalStandingsRoute,
  // seasonsRoute,
  // trophyRoomRoute,
]);

// Cria instância do router
export const router = createRouter({ routeTree });

// Tipagem automática
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
