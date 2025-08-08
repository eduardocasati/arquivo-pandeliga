import { Header } from '../../components';

import './HistoricalStandings.css';

import teams from '../../constants/teams';

export const HistoricalStandings = () => {
  return (
    <>
      <Header />
      <div className="historical-standings">
        <h1>Temporada Regular</h1>
        <table>
          <thead>
            <tr>
              <th>Times</th>
              <th>V</th>
              <th>D</th>
              <th>%V</th>
              <th>PPJ</th>
              <th>PF</th>
              <th>Pos. Méd.</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.roster_id}>
                <td>
                  {/* style={{ '--team-color': `var(--team-${team.team_id})` }} */}
                  <img src={team.team_logo} alt={`${team.display_name} Logo`} />{' '}
                  {team.team_name}
                </td>
                <td>31</td>
                <td>35</td>
                <td>46,97%</td>
                <td>129,60</td>
                <td>8.553,88</td>
                <td>4</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Playoffs</h1>
      </div>
    </>
  );
};
