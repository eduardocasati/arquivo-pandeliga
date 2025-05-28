import { FaTrophy } from 'react-icons/fa';

import './Header.css';

import { logoArquivoPandeliga, logoSleeper } from '../../constants/images';
import leagueChampion from '../../constants/leagueChampion';
import teamList from '../../constants/teamList';

export const Header = () => {
  const championTeam = teamList.find(
    (team) => team.team_name === leagueChampion.team_name,
  );

  return (
    <header className="header">
      <div className="header__top-bar">
        <div className="header__top-bar-inner">
          <div className="header__website-logo">
            <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo" />
          </div>
          <ul className="header__team-list">
            {teamList.map((team) => (
              <li
                key={team.team_id}
                className="header__team-item"
                style={{ '--team-color': `var(--team-${team.team_id})` }}
              >
                {team.display_name}
              </li>
            ))}
          </ul>
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
            <img src={logoSleeper} alt="Sleeper Logo" />
          </div>
        </div>
      </div>

      <div className="header__site-nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">Home</li>
          <li className="header__nav-item">Page2</li>
          <li className="header__nav-item">Page3</li>
          <li className="header__nav-item">Page4</li>
          <li className="header__nav-item">Page5</li>
          <li className="header__nav-item">Page6</li>
        </ul>
      </div>
    </header>
  );
};
