import { useState } from 'react';

// import teamList from '../../../constants/teamList'

import './MobileMenu.css';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div
        className={`header__mobile-menu-icon${
          isMenuOpen ? ' mobile-menu-icon--active' : ''
        }`}
        onClick={handleMobileMenuToggle}
      >
        <div className="mobile-menu-icon__line" />
      </div>

      {/* Renderiza o overlay e o menu apenas quando o menu está aberto */}
      {isMenuOpen && <div className="header__mobile-menu-overlay" />}
      {isMenuOpen && <div className="header__mobile-menu-nav" />}
    </>
  );
};
