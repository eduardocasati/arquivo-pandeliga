import React from 'react';

import './DraftCountdown.header.css';
import './DraftCountdown.hero.css';

import { getTargetDate } from './getTargetDate';
import { useDraftCountdown } from './useDraftCountdown';

/**
 * A prop variant é o prefixo/base da classe CSS, por ex: 'hero'
 * @param {string} variant
 */
export const DraftCountdown = React.memo(({ variant }) => {
  const targetDate = getTargetDate(); // Importa de getTargetDate qual é a data e horário do draft
  const { days, hours, minutes, seconds } = useDraftCountdown(targetDate); // Passa para o custom hook useDraftCountdown a data do draft

  return (
    <>
      <div className={`${variant}__draft-countdown-title`}>
        <h1>O draft de 2025 começa em</h1>
      </div>
      <div className={`${variant}__draft-countdown-numbers`}>
        <div className={`${variant}__draft-countdown-item`}>
          <p>{days}</p>
          <small>{days === '01' ? 'dia' : 'dias'}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{hours}</p>
          <small>{hours === '01' ? 'hora' : 'horas'}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{minutes}</p>
          <small>{minutes === '01' ? 'minuto' : 'minutos'}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{seconds}</p>
          <small>{seconds === '01' ? 'segundo' : 'segundos'}</small>
        </div>
      </div>
    </>
  );
});
