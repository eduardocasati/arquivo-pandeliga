import { FaTrophy } from 'react-icons/fa';

import { TeamsDropdown } from './TeamsDropdown/TeamsDropdown';

import leagueChampion from '../../constants/leagueChampion';
import teamList from '../../constants/teamList';

import { logoArquivoPandeliga, logoSleeper } from '../../constants/images';

import { useState } from 'react';
import './Header.css';

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const championTeam = teamList.find(
    (team) => team.team_name === leagueChampion.team_name,
  );

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
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
              <li className="header__nav-item">Hall da Fama</li>
              <li
                className={`header__nav-item${
                  dropdownOpen ? ' header__nav-item--dropdown-open' : ''
                }`}
                onMouseEnter={handleDropdownToggle}
                onMouseLeave={handleDropdownToggle}
              >
                Times
              </li>
            </ul>
            {dropdownOpen && (
              <TeamsDropdown setDropdownOpen={setDropdownOpen} />
            )}
          </div>
        </div>
      </div>

      <div className="header__main">
        <div className="header__main-inner">
          <div className="header__champion">
            <div className="header__champion-logo">
              {championTeam?.team_logo && (
                <img
                  src={championTeam.team_logo}
                  alt={`${championTeam.team_name} logo`}
                />
              )}
            </div>
            <div className="header__champion-name">
              <h1>
                <span>
                  <FaTrophy />
                </span>{' '}
                Atual campeão
              </h1>
              <h2>{championTeam?.team_name}</h2>
            </div>
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
