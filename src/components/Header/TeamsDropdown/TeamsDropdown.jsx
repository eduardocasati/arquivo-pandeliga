import teamList from '../../../constants/teamList';

import './TeamsDropdown.css';

export const TeamsDropdown = ({ setDropdownOpen }) => {
  return (
    <div
      className="header__dropdown"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <ul>
        {teamList.map((team) => (
          <li
            key={team.team_id}
            style={{ '--team-color': `var(--team-${team.team_id})` }}
          >
            {team.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
