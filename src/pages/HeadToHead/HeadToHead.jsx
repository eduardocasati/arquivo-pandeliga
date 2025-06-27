import { Header } from '../../components/Header/Header';

import './HeadToHead.css';

import { useState } from 'react';
import teamList from '../../constants/teamList';

export const HeadToHead = () => {
  const [teamASelected, setTeamASelected] = useState('');
  const [teamBSelected, setTeamBSelected] = useState('');

  const handleTeamAChange = (event) => {
    setTeamASelected(event.target.value);
  };

  const handleTeamBChange = (event) => {
    setTeamBSelected(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="page-content__wrapper">
        <h1 className="mobile-page__title">Confrontos Diretos</h1>
        <div className="head-to-head__form">
          <form>
            <label htmlFor="teamASelect">
              <select
                name="teamA"
                id="teamASelect"
                value={teamASelected}
                onChange={handleTeamAChange}
              >
                <option value="" disabled>
                  Selecione um time
                </option>
                {teamList.map((team) => (
                  <option
                    value={team.team_name}
                    key={team.team_id}
                    disabled={team.team_name === teamBSelected ? true : false}
                  >
                    {team.team_name}
                  </option>
                ))}
              </select>
            </label>
            {/* <span>vs.</span> */}
            <label htmlFor="">
              <select
                name="teamB"
                id="teamBSelect"
                value={teamBSelected}
                onChange={handleTeamBChange}
              >
                <option value="" disabled>
                  Selecione um time
                </option>
                {teamList.map((team) => (
                  <option
                    value={team.team_name}
                    key={team.team_id}
                    disabled={team.team_name === teamASelected ? true : false}
                  >
                    {team.team_name}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>

        <div className="head-to-head__table">
          {/* TODO fazer uma lógica que renderiza os logos dos times quando os dois são selecionados */}
        </div>
      </div>
    </>
  );
};
