import React from 'react';

import './Countdown.css';

import { getTargetDate } from './getTargetDate';
import { useCountdown } from './useCountdown';

export const Countdown = React.memo(() => {
  const targetDate = getTargetDate(); // Importa de getTargetDate qual é a data e horário do jogo
  const { days, hours, minutes, seconds } = useCountdown(targetDate); // Passa para o custom hook useCountdown a data do jogo

  return (
    <>
      <div className="hero___inner-title">
        <h1>O draft de 2025 começa em</h1>
      </div>
      <div className="countdown__numbers">
        <div className="countdown__numbers-item">
          <p>{days}</p>
          <small>{days === '01' ? 'dia' : 'dias'}</small>
        </div>

        <span>:</span>

        <div className="countdown__numbers-item">
          <p>{hours}</p>
          <small>{hours === '01' ? 'hora' : 'horas'}</small>
        </div>

        <span>:</span>

        <div className="countdown__numbers-item">
          <p>{minutes}</p>
          <small>{minutes === '01' ? 'minuto' : 'minutos'}</small>
        </div>

        <span>:</span>

        <div className="countdown__numbers-item">
          <p>{seconds}</p>
          <small>{seconds === '01' ? 'segundo' : 'segundos'}</small>
        </div>
      </div>
    </>
  );
});
