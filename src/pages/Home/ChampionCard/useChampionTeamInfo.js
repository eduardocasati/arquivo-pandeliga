import { useEffect, useState } from 'react';

import teamList from '../../../constants/teamList';
import {
  getChampionOwnerId,
  getChampionRosterId,
  getChampionTeamName,
} from '../../../services/championService/championService';
import {
  getLocalChampionTeamInfo,
  saveChampionTeamInfo,
} from '../../../utils/storage/championStorage';

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
        const [team_name, owner_id, roster_id] = await Promise.all([
          getChampionTeamName(),
          getChampionOwnerId(),
          getChampionRosterId(),
        ]);
        const findTeam = teamList.find((team) => team.team_name === team_name);
        // une as informações estáticas e da API
        const championData = {
          team_name,
          owner_id,
          roster_id,
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
