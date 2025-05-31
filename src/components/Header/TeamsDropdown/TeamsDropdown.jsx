import teamList from '../../../constants/teamList';

import './TeamsDropdown.css';

export const TeamsDropdown = ({ setIsDropdownOpen }) => {
  return (
    <div
      className="header__dropdown"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
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
