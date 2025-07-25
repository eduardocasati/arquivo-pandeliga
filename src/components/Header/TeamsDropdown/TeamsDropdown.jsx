import teamList from '../../../constants/teams';

import './TeamsDropdown.css';

export const TeamsDropdown = ({ setIsDropdownOpen }) => {
  const sortedTeams = [...teamList].sort((a, b) =>
    a.display_name.localeCompare(b.display_name),
  );

  return (
    <div
      className="header__dropdown"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <ul>
        {sortedTeams.map((team) => (
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
