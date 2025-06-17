import { Link, useMatchRoute } from '@tanstack/react-router';

import './NavLink.css';

export const NavLink = ({ to, label, className }) => {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: false });

  return (
    <li className={`${className}${isActive ? ' nav-item--active' : ''}`}>
      <Link to={to}>{label}</Link>
    </li>
  );
};
