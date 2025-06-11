import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';

import { NavDrawer } from './NavDrawer/NavDrawer';
import { TeamsDropdown } from './TeamsDropdown/TeamsDropdown';

import './Header.css';

import { useChampionData } from '../../hooks/useChampionData';

import {
  logoArquivoPandeliga,
  logoSleeper,
  logoSleeperSmall,
} from '../../constants/images';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { teamData, isLoading } = useChampionData();

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
              <li className="header__nav-item">Home</li>
              <li className="header__nav-item">Confrontos Diretos</li>
              <li className="header__nav-item">Recordes</li>
              <li className="header__nav-item">Classificação Histórica</li>
              <li className="header__nav-item">Temporadas</li>
              <li className="header__nav-item">Sala de Troféus</li>
              <li
                className={`header__nav-item${
                  isDropdownOpen ? ' header__nav-item--dropdown-open' : ''
                }`}
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

          <div className="header__champion">
            {isLoading || !teamData ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="header__champion-logo">
                  <img
                    src={teamData.team_logo}
                    alt={`${teamData.team_name} Logo`}
                  />
                </div>
                <div className="header__champion-name">
                  <h1>
                    <span>
                      <FaTrophy />
                    </span>{' '}
                    Atual campeão
                  </h1>
                  <h2>{teamData.team_name}</h2>
                </div>
              </>
            )}
          </div>
          <div className="header__countdown">
            <p>DRAFT COUNTDOWN</p>
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
