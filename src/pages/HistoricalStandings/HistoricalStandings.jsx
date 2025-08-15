import { Header } from '../../components';

import { LoadingSpinner } from '../../components';

import './HistoricalStandings.css';

import { formatToBRDecimal } from '../../utils/formatters/numberFormat';
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
        <div className="loading-spinner--local">
          <LoadingSpinner />
          <p className="loading-spinner__message">
            Carregando dados das temporadas
          </p>
        </div>
      ) : (
        <>
          <div className="historical-standings">
            <h1>Temporadas Regulares</h1>
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
                        <img
                          src={findTeamImage(team.roster_id)}
                          alt={`${findTeamName(team.roster_id)} Logo`}
                        />{' '}
                        {findTeamName(team.roster_id)}
                      </td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>
                        {team.total_games
                          ? formatToBRDecimal(
                              (team.wins / team.total_games) * 100,
                            ) + '%'
                          : '0%'}
                      </td>
                      <td>
                        {team.total_games
                          ? formatToBRDecimal(
                              team.total_points / team.total_games,
                            )
                          : '0.00'}
                      </td>
                      <td>{formatToBRDecimal(team.total_points)}</td>
                      <td>
                        {team.seasons_played > 0
                          ? formatToBRDecimal(
                              team.total_points / team.seasons_played,
                            )
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
