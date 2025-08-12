import { Header } from '../../components';
import { Route } from '../../routes/$teamId';

import './TeamPage.css';

import teams from '../../constants/teams';

export const TeamPage = () => {
  const { teamId } = Route.useLoaderData();

  const findTeamImage = (teamId) => {
    return teams.find((team) => team.team_id === teamId).team_logo;
  };

  const findTeamName = (teamId) => {
    return teams.find((team) => team.team_id === teamId).team_name;
  };

  return (
    <>
      <Header />
      <div className="team-page">
        <div className="team-page__title">
          <img
            src={findTeamImage(teamId)}
            alt={`${findTeamName(teamId)} Logo`}
          />
          <h1>{findTeamName(teamId)}</h1>
        </div>
      </div>
    </>
  );
};
