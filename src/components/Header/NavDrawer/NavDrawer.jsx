import { Link, useMatchRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { NavLink } from '../NavLink/NavLink';

import './NavDrawer.css';

import { logoArquivoPandeliga } from '../../../constants/images';
import { navItems } from '../../../constants/navItems';
import teams from '../../../constants/teams';

export const NavDrawer = () => {
  const matchRoute = useMatchRoute();
  const isTeamRouteActive = teams.some((team) =>
    matchRoute({ to: `/${team.team_id}`, fuzzy: false }),
  );
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isTeamlistOpen, setIsTeamlistOpen] = useState(false);

  const sortedTeams = [...teams].sort((a, b) =>
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
        inert={!isNavDrawerOpen}
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
              onClick={handleNavDrawerToggle}
            />
          ))}
          <li
            className={`header__mobile-nav-item noselect${isTeamRouteActive ? ' nav-item--active' : ''}`}
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
              const isTeamActive = matchRoute({
                to: `/${team.team_id}`,
                fuzzy: false,
              });

              return (
                <Link
                  to={`/$teamId`}
                  params={{ teamId: team.team_id }}
                  key={team.team_id}
                >
                  <li
                    style={{ '--team-color': `var(--team-${team.team_id})` }}
                    key={team.team_id}
                    onClick={handleNavDrawerToggle}
                    className={
                      isTeamActive ? 'mobile-team-list--team-active' : ''
                    }
                  >
                    {team.display_name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
