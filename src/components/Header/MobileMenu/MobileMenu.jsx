import { useState } from 'react';
import { CgClose } from 'react-icons/cg';

import teamList from '../../../constants/teamList';

import { logoArquivoPandeliga } from '../../../constants/images';

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
      {isMenuOpen && (
        <div className="header__mobile-menu-nav">
          <div className="mobile-menu-nav__top">
            <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo" />
            <div
              className="mobile-menu-icon__close"
              onClick={handleMobileMenuToggle}
            >
              <CgClose />
            </div>
          </div>

          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item">Home</li>
            <li className="header__mobile-nav-item">Confrontos Diretos</li>
            <li className="header__mobile-nav-item">Recordes</li>
            <li className="header__mobile-nav-item">Classificação Histórica</li>
            <li className="header__mobile-nav-item">Temporadas</li>
            <li className="header__mobile-nav-item">Sala de Troféus</li>
            <li className="header__mobile-nav-item">Times</li>
          </ul>
          <ul className="header__mobile-team-list">
            {teamList.map((team) => {
              return (
                <li
                  style={{ '--team-color': `var(--team-${team.team_id})` }}
                  key={team.team_id}
                >
                  {team.display_name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
