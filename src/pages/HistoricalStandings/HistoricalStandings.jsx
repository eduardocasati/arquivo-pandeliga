import { Header } from '../../components';

import { LoadingSpinner } from '../../components';

import './HistoricalStandings.css';

import { useHistoricalStandings } from './useHistoricalStandings';

import teams from '../../constants/teams';

export const HistoricalStandings = () => {
  const { statsByTeam, isLoading } = useHistoricalStandings();

  const teamStatsArray = Object.entries(statsByTeam).map(
    ([roster_id, stats]) => ({
      roster_id,
      ...stats,
    }),
  );

  const findTeamName = (rosterId) => {
    return teams.find((team) => team.roster_id === Number(rosterId)).team_name;
  };

  const findTeamImage = (rosterId) => {
    return teams.find((team) => team.roster_id === Number(rosterId)).team_logo;
  };

  return (
    <>
      <Header />
      {isLoading || !statsByTeam ? (
        <div className="head-to-head__loading-spinner">
          <LoadingSpinner />
          <p className="head-to-head__loading-message">
            Carregando dados das temporadas
          </p>
        </div>
      ) : (
        <>
          <div className="historical-standings">
            <h1>Temporada Regular</h1>
            <div className="historical-standings__table">
              <table>
                <thead>
                  <tr>
                    <th>Times</th>
                    <th>V</th>
                    <th>D</th>
                    <th>%V</th>
                    <th>PPJ</th>
                    <th>PF</th>
                    <th>PPT</th>
                    {/* <th>Pos. Méd.</th> */}
                  </tr>
                </thead>
                <tbody>
                  {teamStatsArray.map((team) => (
                    <tr key={team.roster_id}>
                      <td>
                        {/* style={{ '--team-color': `var(--team-${team.team_id})` }} */}
                        <img
                          src={findTeamImage(team.roster_id)}
                          alt={`${findTeamName(team.roster_id)} Logo`}
                        />{' '}
                        {findTeamName(team.roster_id)}
                      </td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>
                        {team.totalGames
                          ? ((team.wins / team.totalGames) * 100).toFixed(2) +
                            '%'
                          : '0%'}
                      </td>
                      <td>
                        {team.totalGames
                          ? (team.totalPoints / team.totalGames).toFixed(2)
                          : '0.00'}
                      </td>
                      <td>{team.totalPoints.toFixed(2)}</td>
                      <td>
                        {team.seasonsPlayed > 0
                          ? (team.totalPoints / team.seasonsPlayed).toFixed(2)
                          : '0.00'}
                      </td>
                      {/* <td>4</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <h1>Playoffs</h1> */}
          </div>
        </>
      )}
    </>
  );
};
