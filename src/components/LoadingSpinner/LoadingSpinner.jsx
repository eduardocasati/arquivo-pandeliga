import { BounceLoader } from 'react-spinners';

import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="full-page-loading-spinner">
      <div className="loading-spinner">
        <BounceLoader color="#00f6ed" />
      </div>
    </div>
  );
};
