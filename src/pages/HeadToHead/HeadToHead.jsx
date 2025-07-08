import { useState } from 'react';

import { Header } from '../../components/Header/Header';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups';
import { useHeadToHeadMatchups } from './useHeadToHeadMatchups';

import './HeadToHead.css';

import teamList from '../../constants/teamList';

export const HeadToHead = () => {
  const { allSeasonsMatchups, isLoading } = useAllSeasonsMatchups();
  const [selectedFirstTeam, setSelectedFirstTeam] = useState('');
  const [selectedSecondTeam, setSelectedSecondTeam] = useState('');

  const sortedTeams = [...teamList].sort((a, b) =>
    a.team_name.localeCompare(b.team_name),
  );

  const handleFirstTeamChange = (event) => {
    setSelectedFirstTeam(event.target.value);
  };

  const handleSecondTeamChange = (event) => {
    setSelectedSecondTeam(event.target.value);
  };

  const findTeam = (selectedTeam) => {
    const foundTeam = teamList.find((team) => team.team_name === selectedTeam);
    return foundTeam;
  };

  console.log(useHeadToHeadMatchups(1, 2));

  return (
    <>
      <Header />
      <div className="page-content__wrapper">
        {isLoading || !allSeasonsMatchups ? (
          <LoadingSpinner />
        ) : (
          <>
            <h1 className="mobile-page__title">Confrontos Diretos</h1>
            <div className="head-to-head__form">
              <form>
                <label htmlFor="teamASelect">
                  <select
                    name="teamA"
                    id="teamASelect"
                    value={selectedFirstTeam}
                    onChange={handleFirstTeamChange}
                  >
                    <option value="" disabled>
                      Selecione um time
                    </option>
                    {sortedTeams.map((team) => (
                      <option
                        value={team.team_name}
                        key={team.team_id}
                        disabled={
                          team.team_name === selectedSecondTeam ? true : false
                        }
                      >
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="">
                  <select
                    name="teamB"
                    id="teamBSelect"
                    value={selectedSecondTeam}
                    onChange={handleSecondTeamChange}
                  >
                    <option value="" disabled>
                      Selecione um time
                    </option>
                    {sortedTeams.map((team) => (
                      <option
                        value={team.team_name}
                        key={team.team_id}
                        disabled={
                          team.team_name === selectedFirstTeam ? true : false
                        }
                      >
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </label>
              </form>
            </div>

            {selectedFirstTeam && selectedSecondTeam != '' && (
              <>
                <div className="head-to-head__team-logos">
                  <img
                    src={findTeam(selectedFirstTeam).team_logo}
                    alt={`${findTeam(selectedFirstTeam).team_name} Logo`}
                  />
                  <span>vs.</span>
                  <img
                    src={findTeam(selectedSecondTeam).team_logo}
                    alt={`${findTeam(selectedSecondTeam).team_name} Logo`}
                  />
                </div>

                {/* TODO a classe versus-stats__numbers-red é placeholder apenas para testar o visual */}
                {/* na lógica final o número menor fica vermelho dinamicamente */}
                <div className="head-to-head__versus-stats">
                  <div className="versus-stats__row">
                    <p className="versus-stats__numbers">6</p>
                    <p className="versus-stats__center">Vitórias</p>
                    <p className="versus-stats__numbers-red">4</p>
                  </div>
                  <div className="versus-stats__row">
                    <p className="versus-stats__numbers">60%</p>
                    <p className="versus-stats__center">%Vitórias</p>
                    <p className="versus-stats__numbers-red">40%</p>
                  </div>
                  <div className="versus-stats__row">
                    <p className="versus-stats__numbers">1700,00</p>
                    <p className="versus-stats__center">Pontos</p>
                    <p className="versus-stats__numbers-red">1300,00</p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
