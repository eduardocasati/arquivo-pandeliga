import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups.js';

export const useHeadToHeadMatchups = (
  firstTeamRosterId,
  secondTeamRosterId,
) => {
  const { allSeasonsMatchups, isLoading, isError, error } =
    useAllSeasonsMatchups();

  const headToHeadMatchups = [];

  allSeasonsMatchups.forEach((seasonData) => {
    const { matchups, season } = seasonData;
    matchups.forEach((weekMatchups, weekIndex) => {
      if (weekMatchups.length === 0) return; // condição para ignorar semanas que ainda não têm jogos e são arrays vazios

      const firstTeamResult = weekMatchups.find(
        (result) => result.roster_id === firstTeamRosterId,
      );
      const secondTeamResult = weekMatchups.find(
        (result) => result.roster_id === secondTeamRosterId,
      );

      if (
        firstTeamResult &&
        secondTeamResult &&
        firstTeamResult.matchup_id === secondTeamResult.matchup_id
      ) {
        const foundHeadToHeadMatchup = weekMatchups.filter(
          (result) => result.matchup_id === firstTeamResult.matchup_id,
        );
        headToHeadMatchups.push({
          season,
          week: weekIndex + 1,
          matchup: foundHeadToHeadMatchup,
        });
      }
    });
  });

  return headToHeadMatchups;
};
