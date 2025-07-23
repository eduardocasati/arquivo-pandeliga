import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes';

import { Footer } from './components/Footer/Footer';

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
