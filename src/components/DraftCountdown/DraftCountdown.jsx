import React from 'react';
// import { BsClockHistory } from 'react-icons/bs';
// import { BsClock } from 'react-icons/bs';
import { FaHourglassHalf } from 'react-icons/fa';

import './DraftCountdown.header.css';
import './DraftCountdown.hero.css';

import { getTargetDate } from './getTargetDate';
import { useDraftCountdown } from './useDraftCountdown';

/**
 * A prop variant é o prefixo/base da classe CSS, por ex: 'hero'
 * @param {string} variant
 */
export const DraftCountdown = React.memo(({ variant, compact = false }) => {
  const targetDate = getTargetDate(); // Importa de getTargetDate qual é a data e horário do draft
  const { days, hours, minutes, seconds } = useDraftCountdown(targetDate); // Passa para o custom hook useDraftCountdown a data do draft

  // essa função controla duas coisas:
  // se compact for true, ao invés de mostrar Dia/Hora/Minuto/Segundo, mostra D/H/M/S
  // se o número no countdown for 01, muda a palavra para singular (Dias vira Dia, etc...)
  const formatUnitLabel = (n, singular, plural, short) =>
    compact ? short : n === '01' ? singular : plural;

  return (
    <>
      <div className={`${variant}__draft-countdown-title`}>
        <h1>
          {compact && (
            <span>
              <FaHourglassHalf />
            </span>
          )}
          O draft de 2025 começa em
        </h1>
      </div>
      <div className={`${variant}__draft-countdown-numbers`}>
        <div className={`${variant}__draft-countdown-item`}>
          <p>{days}</p>
          {/* <small>{days === '01' ? 'dia' : 'dias'}</small> */}
          <small>{formatUnitLabel(days, 'dia', 'dias', 'D')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{hours}</p>
          {/* <small>{hours === '01' ? 'hora' : 'horas'}</small> */}
          <small>{formatUnitLabel(hours, 'hora', 'horas', 'H')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{minutes}</p>
          {/* <small>{minutes === '01' ? 'minuto' : 'minutos'}</small> */}
          <small>{formatUnitLabel(minutes, 'minuto', 'minutos', 'M')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{seconds}</p>
          {/* <small>{seconds === '01' ? 'segundo' : 'segundos'}</small> */}
          <small>{formatUnitLabel(seconds, 'segundo', 'segundos', 'S')}</small>
        </div>
      </div>
    </>
  );
});
