import { Link, useMatchRoute } from '@tanstack/react-router';

import './MobileNavLink.css';

export const MobileNavLink = ({ to, label }) => {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: false });

  return (
    <li
      className={`header__mobile-nav-item${isActive ? ' nav-item--active' : ''}`}
    >
      <Link to={to}>{label}</Link>
    </li>
  );
};
