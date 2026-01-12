import React from 'react';
import { FaHourglassHalf } from 'react-icons/fa';

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import './DraftCountdown.header.css';
import './DraftCountdown.hero.css';

import { useDraftCountdown } from './useDraftCountdown';
import { useDraftDate } from './useDraftDate';

/**
 * A prop variant é o prefixo/base da classe CSS, por ex: 'hero'
 * @param {string} variant
 */
export const DraftCountdown = React.memo(({ variant, compact = false }) => {
  const { data: targetDate, isLoading } = useDraftDate();

  const countdown = useDraftCountdown(targetDate, {
    enabled: !!targetDate,
  });

  // TODO pensar em uma solução visual mais elegante para aparecer enquanto recebe a data do draft
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { days, hours, minutes, seconds } = countdown;

  // essa função controla duas coisas:
  // se compact for true, ao invés de mostrar Dia/Hora/Minuto/Segundo, mostra D/H/M/S
  // se o número no countdown for 01, muda a palavra para singular (Dias vira Dia, etc...)
  const formatUnitLabel = (n, singular, plural, short) =>
    compact ? short : n === '01' ? singular : plural;

  // se o countdown chegou a zero, ele não é renderizado
  if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
    return null;
  }

  return (
    <>
      <div className={`${variant}__draft-countdown-title`}>
        <h1>
          {compact && (
            <span>
              <FaHourglassHalf />
            </span>
          )}
          {/* TODO condicional para exibir data do draft, depois data do início da temporada, depois outra coisa */}
          O draft de 2026 começa em
        </h1>
      </div>
      <div className={`${variant}__draft-countdown-numbers`}>
        <div className={`${variant}__draft-countdown-item`}>
          <p>{days}</p>
          <small>{formatUnitLabel(days, 'dia', 'dias', 'D')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{hours}</p>
          <small>{formatUnitLabel(hours, 'hora', 'horas', 'H')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{minutes}</p>
          <small>{formatUnitLabel(minutes, 'minuto', 'minutos', 'M')}</small>
        </div>

        <span>:</span>

        <div className={`${variant}__draft-countdown-item`}>
          <p>{seconds}</p>
          <small>{formatUnitLabel(seconds, 'segundo', 'segundos', 'S')}</small>
        </div>
      </div>
    </>
  );
});
