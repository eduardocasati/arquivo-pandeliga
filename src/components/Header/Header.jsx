import './Header.css';

import teamList from '../../constants/teamList';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__team-nav">
        <ul className="header__team-list">
          {teamList.map((team) => {
            const cssVarName = `--team-${team.team_name.toLowerCase().replace(/\s+/g, '')}`;
            return (
              <li
                key={team.team_name}
                className="header__team-item"
                style={{ '--team-color': `var(${cssVarName})` }}
              >
                {team.team_name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="header__main">
        <div className="header__secondary-inner"></div>
      </div>
      <div className="header__site-nav">
        <ul className="header__nav-list"></ul>
      </div>
    </header>
  );
};
