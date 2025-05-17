import './Header.css';

import teamList from '../../constants/teamList';

import { logoArquivoPandeliga } from '../../constants/images';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__top-bar">
        {/* header__top-bar-inner = wrapper contendo o logo e a navegação dos times */}
        <div className="header__top-bar-inner">
          {/* logo do site */}
          <div className="header__website-logo">
            <img src={logoArquivoPandeliga} alt="Arquivo Pandeliga Logo"></img>
          </div>
          {/* header__team-list = wrapper contendo o menu com a lista dos times */}
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
      </div>
      <div className="header__main">
        <div className="header__main-inner"></div>
      </div>
      <div className="header__site-nav">
        <ul className="header__nav-list"></ul>
      </div>
    </header>
  );
};
