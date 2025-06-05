import { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md';

import teamList from '../../../constants/teamList';

import { logoArquivoPandeliga } from '../../../constants/images';

import './MobileMenu.css';

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeamlistOpen, setIsTeamlistOpen] = useState(false);

  const handleMobileMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleTeamlistToggle = () => setIsTeamlistOpen(!isTeamlistOpen);

  return (
    <>
      <div
        className="header__mobile-menu-icon noselect"
        onClick={handleMobileMenuToggle}
      >
        <CgMenu />
      </div>

      <div
        className={`header__mobile-menu-overlay${isMenuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      />

      <div
        className={`header__mobile-menu${isMenuOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
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
          <li
            className="header__mobile-nav-item noselect"
            onClick={handleTeamlistToggle}
          >
            Times
            <span className={isTeamlistOpen && 'arrow-rotate-up'}>
              <MdKeyboardArrowDown />
            </span>
          </li>
        </ul>
        <div
          className={`header__mobile-team-list${isTeamlistOpen ? ' team-list--open' : ''}`}
          aria-hidden={!isTeamlistOpen}
        >
          <ul>
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
      </div>
    </>
  );
};
