import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { Home } from './pages/Home/Home';

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

// Monta árvore de rotas
const routeTree = rootRoute.addChildren([homeRoute]);

// Cria instância do router
export const router = createRouter({ routeTree });

// Tipagem automática
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
