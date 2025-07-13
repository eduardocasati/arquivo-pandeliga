import { useEffect, useState } from 'react';

import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups.js';
import { headToHeadProcessor } from '../../utils/processors/headToHeadProcessor.js';

export const useHeadToHeadMatchups = (
  firstTeamRosterId,
  secondTeamRosterId,
) => {
  const { allSeasonsMatchups, isLoading, isError, error } =
    useAllSeasonsMatchups();
  const [headToHeadMatchups, setHeadToHeadMatchups] = useState(null);
  const [headToHeadStats, setHeadToHeadStats] = useState(null);

  useEffect(() => {
    if (!firstTeamRosterId || !secondTeamRosterId || !allSeasonsMatchups) {
      setHeadToHeadMatchups(null);
      setHeadToHeadStats(null);
      return;
    }

    const h2hMatchups = [];

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
          firstTeamResult.matchup_id &&
          secondTeamResult.matchup_id &&
          firstTeamResult.matchup_id === secondTeamResult.matchup_id
        ) {
          const foundHeadToHeadMatchup = weekMatchups.filter(
            (result) => result.matchup_id === firstTeamResult.matchup_id,
          );
          h2hMatchups.push({
            season,
            week: weekIndex + 1,
            matchup: foundHeadToHeadMatchup,
          });
        }
      });
    });

    // ordena os matchups de forma decrescente pelo ano e depois semana
    const sortedHeadToHeadMatchups = h2hMatchups.sort((a, b) => {
      if (a.season !== b.season) {
        return b.season - a.season; // season decrescente
      }
      return b.week - a.week; // week decrescente
    });

    setHeadToHeadMatchups(sortedHeadToHeadMatchups);

    // processa os dados dos matchups e retorna pontos, vitórias e porcentagem de vitórias
    const statsBetweenTeams = headToHeadProcessor(
      firstTeamRosterId,
      secondTeamRosterId,
      sortedHeadToHeadMatchups,
    );

    setHeadToHeadStats(statsBetweenTeams);
  }, [firstTeamRosterId, secondTeamRosterId, allSeasonsMatchups]);

  return { headToHeadMatchups, headToHeadStats };
};
