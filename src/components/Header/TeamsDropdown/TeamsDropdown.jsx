import { Link } from '@tanstack/react-router';

import './TeamsDropdown.css';

import teams from '../../../constants/teams';

export const TeamsDropdown = ({ setIsDropdownOpen }) => {
  const sortedTeams = [...teams].sort((a, b) =>
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
            <Link to={`/$teamId`} params={{ teamId: team.team_id }}>
              {team.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
