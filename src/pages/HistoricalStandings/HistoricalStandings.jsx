import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Header, LoadingSpinner } from '../../components';

import './HistoricalStandings.css';

import { formatToBRDecimal } from '../../utils/formatters/numberFormat';
import { useHistoricalStandings } from './useHistoricalStandings';

import teams from '../../constants/teams';

export const HistoricalStandings = () => {
  const { statsByTeam, isLoading } = useHistoricalStandings();
  const [sortConfig, setSortConfig] = useState({
    key: 'winPercentage',
    direction: 'desc',
  });

  const teamStatsArray = Object.entries(statsByTeam).map(
    ([roster_id, stats]) => {
      const winPercentage = stats.total_games
        ? (stats.wins / stats.total_games) * 100
        : 0;

      const pointsPerGame = stats.total_games
        ? stats.total_points / stats.total_games
        : 0;

      const pointsPerSeason = stats.seasons_played
        ? stats.total_points / stats.seasons_played
        : 0;

      return {
        roster_id,
        ...stats,
        winPercentage,
        pointsPerGame,
        pointsPerSeason,
      };
    },
  );

  const sortedTeams = [...teamStatsArray].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'desc' };
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="inline-block ml-1" />
    ) : (
      <ArrowDown size={14} className="inline-block ml-1" />
    );
  };

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
        <div className="historical-standings">
          <h1>Temporadas Regulares</h1>
          <div className="historical-standings__table">
            <table>
              <thead>
                <tr>
                  <th>Times</th>
                  <th
                    onClick={() => handleSort('wins')}
                    className={sortConfig.key === 'wins' ? 'sorted-column' : ''}
                  >
                    V {renderSortIcon('wins')}
                  </th>
                  <th
                    onClick={() => handleSort('losses')}
                    className={
                      sortConfig.key === 'losses' ? 'sorted-column' : ''
                    }
                  >
                    D {renderSortIcon('losses')}
                  </th>
                  <th
                    onClick={() => handleSort('winPercentage')}
                    className={
                      sortConfig.key === 'winPercentage' ? 'sorted-column' : ''
                    }
                  >
                    %V {renderSortIcon('winPercentage')}
                  </th>
                  <th
                    onClick={() => handleSort('pointsPerGame')}
                    className={
                      sortConfig.key === 'pointsPerGame' ? 'sorted-column' : ''
                    }
                  >
                    PPJ {renderSortIcon('pointsPerGame')}
                  </th>
                  <th
                    onClick={() => handleSort('total_points')}
                    className={
                      sortConfig.key === 'total_points' ? 'sorted-column' : ''
                    }
                  >
                    PF {renderSortIcon('total_points')}
                  </th>
                  <th
                    onClick={() => handleSort('pointsPerSeason')}
                    className={
                      sortConfig.key === 'pointsPerSeason'
                        ? 'sorted-column'
                        : ''
                    }
                  >
                    PPT {renderSortIcon('pointsPerSeason')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTeams.map((team) => (
                  <tr key={team.roster_id}>
                    <td>
                      <img
                        src={findTeamImage(team.roster_id)}
                        alt={`${findTeamName(team.roster_id)} Logo`}
                      />{' '}
                      {findTeamName(team.roster_id)}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'wins' ? 'sorted-column' : ''
                      }
                    >
                      {team.wins}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'losses' ? 'sorted-column' : ''
                      }
                    >
                      {team.losses}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'winPercentage'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.winPercentage) + '%'}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'pointsPerGame'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.pointsPerGame)}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'total_points' ? 'sorted-column' : ''
                      }
                    >
                      {formatToBRDecimal(team.total_points)}
                    </td>
                    <td
                      className={
                        sortConfig.key === 'pointsPerSeason'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.pointsPerSeason)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
