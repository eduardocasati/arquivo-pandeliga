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
    key: 'win_percentage',
    direction: 'desc',
  });

  const teamStatsArray = Object.entries(statsByTeam).map(
    ([roster_id, stats]) => {
      const win_percentage = stats.total_games
        ? (stats.wins / stats.total_games) * 100
        : 0;

      const points_per_game = stats.total_games
        ? stats.total_points / stats.total_games
        : 0;

      const points_per_season = stats.seasons_played
        ? stats.total_points / stats.seasons_played
        : 0;

      return {
        roster_id,
        ...stats,
        win_percentage,
        points_per_game,
        points_per_season,
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
                    onClick={() => handleSort('win_percentage')}
                    className={
                      sortConfig.key === 'win_percentage' ? 'sorted-column' : ''
                    }
                  >
                    %V {renderSortIcon('win_percentage')}
                  </th>
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
                    onClick={() => handleSort('points_per_game')}
                    className={
                      sortConfig.key === 'points_per_game'
                        ? 'sorted-column'
                        : ''
                    }
                  >
                    PPJ {renderSortIcon('points_per_game')}
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
                    onClick={() => handleSort('points_per_season')}
                    className={
                      sortConfig.key === 'points_per_season'
                        ? 'sorted-column'
                        : ''
                    }
                  >
                    PPT {renderSortIcon('points_per_season')}
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
                        sortConfig.key === 'win_percentage'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.win_percentage) + '%'}
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
                        sortConfig.key === 'points_per_game'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.points_per_game)}
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
                        sortConfig.key === 'points_per_season'
                          ? 'sorted-column'
                          : ''
                      }
                    >
                      {formatToBRDecimal(team.points_per_season)}
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
