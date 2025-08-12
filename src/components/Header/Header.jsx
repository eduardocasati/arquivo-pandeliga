import { useMatchRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';

import { DraftCountdown } from '..';
import { NavDrawer } from './NavDrawer/NavDrawer';
import { NavLink } from './NavLink/NavLink';
import { TeamsDropdown } from './TeamsDropdown/TeamsDropdown';

import './Header.css';

import { useChampionData } from '../../hooks/useChampionData';

import { navItems } from '../../constants/navItems';

import { LoadingSpinner } from '..';
import {
  logoArquivoPandeliga,
  logoSleeper,
  logoSleeperSmall,
} from '../../constants/images';
import teams from '../../constants/teams';

export const Header = () => {
  const matchRoute = useMatchRoute();
  const isHomeRouteActive = matchRoute({ to: '/', fuzzy: false });
  const isTeamRouteActive = teams.some((team) =>
    matchRoute({ to: `/${team.display_name}`, fuzzy: false }),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { championData, isLoading } = useChampionData();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header__top-bar">
        <div className="header__top-bar-inner">
          <div className="header__website-logo">
            <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo" />
          </div>
          <div className="header__site-nav">
            <ul className="header__nav-list">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  label={label}
                  className={'header__nav-item'}
                />
              ))}
              {/* Times está separado pois não leva a nenhuma rota */}
              <li
                className={`header__nav-item${isDropdownOpen ? ' header__nav-item--dropdown-open' : ''}${isTeamRouteActive ? ' nav-item--active' : ''}`}
                // className={`header__nav-item${isDropdownOpen ? ' header__nav-item--dropdown-open' : ''}`}
                onMouseEnter={handleDropdownToggle}
                onMouseLeave={handleDropdownToggle}
              >
                Times
              </li>
            </ul>
            {isDropdownOpen && (
              <TeamsDropdown setIsDropdownOpen={setIsDropdownOpen} />
            )}
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className="header__main-inner">
          {/* MENU MOBILE */}
          <NavDrawer />

          {/* LOGO DA VERSÃO MOBILE */}
          <div className="header__mobile-logo">
            <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo" />
          </div>

          {/* LOGO SLEEPER VERSÃO MOBILE */}
          <div className="header__sleeper-logo-mobile">
            <a
              href="https://sleeper.com/leagues/1181787756111253504/predraft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logoSleeperSmall} alt="Sleeper Logo" />
            </a>
          </div>

          <div className="header__countdown">
            {!isHomeRouteActive && (
              <DraftCountdown variant={'header'} compact />
            )}
          </div>

          <div className="header__champion">
            {isLoading || !championData ? (
              <div className="loading-spinner--fullscreen">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="header__champion-logo">
                  <img
                    src={championData.team_logo}
                    alt={`${championData.team_name} Logo`}
                  />
                </div>
                <div className="header__champion-name">
                  <h1>
                    <span>
                      <FaTrophy />
                    </span>{' '}
                    Atual campeão
                  </h1>
                  <h2>{championData.team_name}</h2>
                </div>
              </>
            )}
          </div>

          <div className="header__sleeper-logo">
            <a
              href="https://sleeper.com/leagues/1181787756111253504/predraft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logoSleeper} alt="Sleeper Logo" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
