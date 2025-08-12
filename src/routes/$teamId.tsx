import { createFileRoute, notFound } from '@tanstack/react-router';

import { TeamPage } from '../pages';

import teams from '../constants/teams';

export const Route = createFileRoute('/$teamId')({
  component: TeamPage,
  loader: async ({ params }) => {
    const validTeamIds = teams.map((team) => team.team_id);

    if (!validTeamIds.includes(params.teamId)) {
      throw notFound();
    }

    return {
      teamId: params.teamId,
    };
  },
});
