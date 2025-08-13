import { Header } from '../../components';
import { Route } from '../../routes/$teamId';

import './TeamPage.css';

import { LoadingSpinner } from '../../components';

import { useTeamStats } from './useTeamStats.js';

import teams from '../../constants/teams';

export const TeamPage = () => {
  const { teamId } = Route.useLoaderData();
  const { teamStats, isLoading } = useTeamStats(
    Number(teams.find((team) => team.team_id === teamId).roster_id),
  );

  console.log(teamStats);

  const findTeamImage = (teamId) => {
    return teams.find((team) => team.team_id === teamId).team_logo;
  };

  const findTeamName = (teamId) => {
    return teams.find((team) => team.team_id === teamId).team_name;
  };

  return (
    <>
      <Header />
      {isLoading || !teamStats ? (
        <div className="loading-spinner--local">
          <LoadingSpinner />
          <p className="loading-spinner__message">Carregando dados do time</p>
        </div>
      ) : (
        <div className="team-page">
          <div className="team-page__title">
            <img
              src={findTeamImage(teamId)}
              alt={`${findTeamName(teamId)} Logo`}
            />
            <h1>{findTeamName(teamId)}</h1>
          </div>
        </div>
      )}
    </>
  );
};
