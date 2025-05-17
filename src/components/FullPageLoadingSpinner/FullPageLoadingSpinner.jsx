import { BounceLoader } from 'react-spinners';

import './FullPageLoadingSpinner.css';

export const FullPageLoadingSpinner = () => {
  return (
    <div className="full-page-loading-spinner">
      <div className="loading-spinner">
        <BounceLoader color="#10e0a9" />
      </div>
    </div>
  );
};
