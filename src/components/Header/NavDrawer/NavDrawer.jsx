import { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { NavLink } from '../NavLink/NavLink';

import './NavDrawer.css';

import { logoArquivoPandeliga } from '../../../constants/images';
import { navItems } from '../../../constants/navItems';
import teamList from '../../../constants/teamList';

export const NavDrawer = () => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isTeamlistOpen, setIsTeamlistOpen] = useState(false);

  const sortedTeams = [...teamList].sort((a, b) =>
    a.display_name.localeCompare(b.display_name),
  );

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
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              label={label}
              className={'header__mobile-nav-item'}
            />
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
            {sortedTeams.map((team) => {
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
