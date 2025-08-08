import { useState } from 'react';

import { Header, LoadingSpinner } from '../../components';
import { MatchupTable } from './MatchupTable/MatchupTable';

import './HeadToHead.css';

import { useAllSeasonsMatchups } from '../../hooks/useAllSeasonsMatchups';
import { useHeadToHeadMatchups } from './useHeadToHeadMatchups';

import teams from '../../constants/teams';

export const HeadToHead = () => {
  const { data, isLoading } = useAllSeasonsMatchups();
  const allSeasonsMatchups = data?.allSeasonsMatchups;

  const [selectedFirstTeam, setSelectedFirstTeam] = useState('');
  const [selectedSecondTeam, setSelectedSecondTeam] = useState('');

  const { headToHeadMatchups, headToHeadStats } = useHeadToHeadMatchups(
    selectedFirstTeam ? Number(selectedFirstTeam) : null,
    selectedSecondTeam ? Number(selectedSecondTeam) : null,
    allSeasonsMatchups,
  );

  // desestrutura o objeto headToHeadStats, e garante que a renderização espere até que os valores não sejam null
  const {
    firstTeamWins = '',
    secondTeamWins = '',
    firstTeamWinPercentage = '',
    secondTeamWinPercentage = '',
    firstTeamTotalPoints = '',
    secondTeamTotalPoints = '',
  } = headToHeadStats || {};

  // funções utilitárias
  const sortedTeams = [...teams].sort((a, b) =>
    a.display_name.localeCompare(b.display_name),
  );

  const handleFirstTeamChange = (event) => {
    setSelectedFirstTeam(event.target.value);
  };

  const handleSecondTeamChange = (event) => {
    setSelectedSecondTeam(event.target.value);
  };

  const findTeam = (selectedTeam) => {
    const foundTeam = teams.find(
      (team) => team.roster_id === Number(selectedTeam),
    );
    return foundTeam;
  };

  // função e variáveis para colorir as estatísticas de forma dinâmica
  const getStatColors = (a, b) => {
    const COLOR_GREEN = 'var(--color-text-accent-green)';
    const COLOR_PINK = 'var(--color-text-accent-pink)';
    // const COLOR_WHITE = 'var(--color-text-primary)';
    // const COLOR_WHITE = '#FCDC4D';
    // const COLOR_WHITE = '#F9DC5C';
    // const COLOR_WHITE = '#EECF6D';
    // const COLOR_WHITE = '#E1CE7A';
    const COLOR_WHITE = '#C9F0FF';
    // const COLOR_WHITE = '#CEE5F2';
    if (a > b) return [COLOR_GREEN, COLOR_PINK];
    if (a < b) return [COLOR_PINK, COLOR_GREEN];
    return [COLOR_WHITE, COLOR_WHITE];
  };
  const [winsLeftColor, winsRightColor] = getStatColors(
    firstTeamWins,
    secondTeamWins,
  );
  const [percentageLeftColor, percentageRightColor] = getStatColors(
    firstTeamWinPercentage,
    secondTeamWinPercentage,
  );
  const [pointsLeftColor, pointsRightColor] = getStatColors(
    parseFloat(firstTeamTotalPoints.replace('.', '').replace(',', '.')),
    parseFloat(secondTeamTotalPoints.replace('.', '').replace(',', '.')),
    // o parseFloat faz a string virar número
    // os replaces formatam os números para o padrão americano para o JavaScript fazer a comparação corretamente
  );

  return (
    <>
      <Header />
      {isLoading || !allSeasonsMatchups ? (
        <div className="head-to-head__loading-spinner">
          <LoadingSpinner />
          <p className="head-to-head__loading-message">Carregando</p>
        </div>
      ) : (
        <>
          <div className="head-to-head__form">
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
                    value={team.roster_id}
                    key={team.team_id}
                    disabled={
                      team.roster_id === Number(selectedSecondTeam)
                        ? true
                        : false
                    }
                  >
                    {team.display_name}
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
                    value={team.roster_id}
                    key={team.team_id}
                    disabled={
                      team.roster_id === Number(selectedFirstTeam)
                        ? true
                        : false
                    }
                  >
                    {team.display_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedFirstTeam && selectedSecondTeam != '' && (
            <>
              <div className="head-to-head__versus-stats">
                <div className="versus-stats__row">
                  <p
                    className="versus-stats__numbers versus-stats__numbers--left"
                    style={{ '--stat-color': winsLeftColor }}
                  >
                    {firstTeamWins}
                  </p>
                  <p className="versus-stats__center">Vitórias</p>
                  <p
                    className="versus-stats__numbers versus-stats__numbers--right"
                    style={{ '--stat-color': winsRightColor }}
                  >
                    {secondTeamWins}
                  </p>
                </div>
                <div className="versus-stats__row">
                  <p
                    className="versus-stats__numbers versus-stats__numbers--left"
                    style={{ '--stat-color': percentageLeftColor }}
                  >
                    {firstTeamWinPercentage}%
                  </p>
                  <p className="versus-stats__center">%Vitórias</p>
                  <p
                    className="versus-stats__numbers versus-stats__numbers--right"
                    style={{ '--stat-color': percentageRightColor }}
                  >
                    {secondTeamWinPercentage}%
                  </p>
                </div>
                <div className="versus-stats__row">
                  <p
                    className="versus-stats__numbers versus-stats__numbers--left"
                    style={{ '--stat-color': pointsLeftColor }}
                  >
                    {firstTeamTotalPoints}
                  </p>
                  <p className="versus-stats__center">Pontos</p>
                  <p
                    className="versus-stats__numbers versus-stats__numbers--right"
                    style={{ '--stat-color': pointsRightColor }}
                  >
                    {secondTeamTotalPoints}
                  </p>
                </div>
              </div>

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

              {/* TABELA COM OS MATCHUPS */}
              <MatchupTable
                selectedFirstTeam={selectedFirstTeam}
                selectedSecondTeam={selectedSecondTeam}
                headToHeadMatchups={headToHeadMatchups}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
