// import { RouterProvider } from '@tanstack/react-router';
// import { router } from './routes';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

import { Footer } from './components';

const router = createRouter({ routeTree });

function App() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
