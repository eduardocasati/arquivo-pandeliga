import { useEffect, useState } from 'react';

import teamList from '../constants/teamList.js';
import {
  getChampionOwnerId,
  getChampionPostSeasonResults,
  getChampionRegularSeasonResults,
  getChampionRosterId,
  getChampionTeamName,
  getChampionUserName,
} from '../services/championService/championService.js';
import { formatToBRDecimal } from '../utils/numberFormat.js';
import { hasPlayoffByeWeek } from '../utils/seasonData/hasPlayoffByeWeek.js';
import { sumPoints } from '../utils/seasonData/sumPoints.js';
import {
  getLocalChampionTeamInfo,
  saveChampionTeamInfo,
} from '../utils/storage/championStorage.js';

export function useChampionData() {
  const [teamInfo, setTeamInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChampionInfo = async () => {
      const cachedData = getLocalChampionTeamInfo();

      // pega as informações do campeão no local storage se existirem
      if (cachedData) {
        setTeamInfo(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        const [
          team_name,
          owner_id,
          roster_id,
          user_name,
          regular_season_results,
          playoffs_results,
        ] = await Promise.all([
          getChampionTeamName(),
          getChampionOwnerId(),
          getChampionRosterId(),
          getChampionUserName(),
          getChampionRegularSeasonResults(),
          getChampionPostSeasonResults(),
        ]);
        // encontra o time campeão na constant teamList
        const findTeam = teamList.find((team) => team.team_name === team_name);

        // verifica se teve bye week nos playoffs
        const hadByeWeek = hasPlayoffByeWeek(playoffs_results);
        // soma os pontos totais da temporada regular e playoffs
        const regularSeasonTotalPoints = sumPoints(regular_season_results);
        // a verificação no parâmetro assegura que a semana de bye não seja somada
        const playoffsTotalPoints = sumPoints(
          hadByeWeek === true ? playoffs_results.slice(1) : playoffs_results,
        );
        // cálculo de pontos por jogo
        const regularSeasonPpg = regularSeasonTotalPoints / 14;
        // se teve bye são dois jogos, senão 3
        const playoffsPpg = hadByeWeek
          ? playoffsTotalPoints / 2
          : playoffsTotalPoints / 3;

        // une as informações estáticas e da API
        const championData = {
          team_name,
          owner_id,
          roster_id,
          user_name,
          team_id: findTeam.team_id,
          display_name: findTeam?.display_name,
          team_logo: findTeam.team_logo,
          regular_season_record: {
            wins: 0,
            losses: 0,
          },
          regular_season_total_points: formatToBRDecimal(
            regularSeasonTotalPoints,
          ),
          regular_season_ppg: formatToBRDecimal(regularSeasonPpg),
          playoffs_total_points: formatToBRDecimal(playoffsTotalPoints),
          playoffs_ppg: formatToBRDecimal(playoffsPpg),
          roster_moves: 0,
          bye_week: hadByeWeek,
        };
        setTeamInfo(championData);
        // salva as informações no local storage
        saveChampionTeamInfo(championData);
      } catch (error) {
        console.error('Erro ao buscar dados do campeão:', error);
        setTeamInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampionInfo();
  }, []);

  return { teamInfo, isLoading };
}
