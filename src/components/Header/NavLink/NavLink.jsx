import { Link } from '@tanstack/react-router';

import { useMatchRoute } from '@tanstack/react-router';
import './NavLink.css';

export const NavLink = ({ to, label }) => {
  const matchRoute = useMatchRoute();
  const isActive = matchRoute({ to, fuzzy: false });

  return (
    <li className={`header__nav-item${isActive ? ' nav-item--active' : ''}`}>
      <Link to={to}>{label}</Link>
    </li>
  );
};
