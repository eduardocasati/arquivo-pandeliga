import { useState } from 'react';

// import teamList from '../../../constants/teamList'

import './NavDrawer.css';

export const NavDrawer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavDrawerToggle = () => setMenuOpen(!menuOpen);

  return <div className="header__mobile-menu">NavDrawer</div>;
};
