import { useEffect, useState } from 'react';

import teamList from '../constants/teamList.js';
import {
  getChampionOwnerId,
  getChampionRosterId,
  getChampionTeamName,
  getChampionUserName,
} from '../services/championService/championService.js';
import {
  getLocalChampionTeamInfo,
  saveChampionTeamInfo,
} from '../utils/storage/championStorage';

export function useChampionTeamInfo() {
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
        const [team_name, owner_id, roster_id, user_name] = await Promise.all([
          getChampionTeamName(),
          getChampionOwnerId(),
          getChampionRosterId(),
          getChampionUserName(),
        ]);
        // encontra o time campeão na constant teamList
        const findTeam = teamList.find((team) => team.team_name === team_name);
        // une as informações estáticas e da API
        const championData = {
          team_name,
          owner_id,
          roster_id,
          user_name,
          team_id: findTeam.team_id,
          display_name: findTeam?.display_name,
          team_logo: findTeam.team_logo,
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
