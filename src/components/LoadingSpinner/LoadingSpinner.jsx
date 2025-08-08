import { MoonLoader } from 'react-spinners';

import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <MoonLoader color="#00f6ed" />
    </div>
  );
};
