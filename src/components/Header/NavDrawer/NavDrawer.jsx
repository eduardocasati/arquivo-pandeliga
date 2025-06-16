import { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { MobileNavLink } from '../MobileNavLink/MobileNavLink';

import './NavDrawer.css';

import { logoArquivoPandeliga } from '../../../constants/images';
import { navItems } from '../../../constants/navItems';
import teamList from '../../../constants/teamList';

export const NavDrawer = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isTeamlistOpen, setIsTeamlistOpen] = useState(false);

  const handleNavDrawerToggle = () => setIsNavDrawerOpen(!isNavDrawerOpen);

  const handleTeamlistToggle = () => setIsTeamlistOpen(!isTeamlistOpen);

  return (
    <>
      <div
        className="header__mobile-menu-icon noselect"
        onClick={handleNavDrawerToggle}
      >
        <CgMenu />
      </div>

      <div
        className={`header__mobile-menu-overlay${isNavDrawerOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isNavDrawerOpen}
      />

      <div
        className={`header__mobile-menu${isNavDrawerOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!isNavDrawerOpen}
      >
        <div className="mobile-menu-nav__top">
          <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo" />
          <div
            className="mobile-menu-icon__close"
            onClick={handleNavDrawerToggle}
          >
            <CgClose />
          </div>
        </div>

        <ul className="header__mobile-nav-list">
          {/* TODO criar estilo específico para item ativo no menu mobile */}
          {navItems.map(({ to, label }) => (
            <MobileNavLink key={to} to={to} label={label} />
          ))}
          <li
            className="header__mobile-nav-item noselect"
            onClick={handleTeamlistToggle}
          >
            Times
            <span className={isTeamlistOpen ? 'arrow-rotate-up' : ''}>
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
