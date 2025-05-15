import { getTargetDate } from './getTargetDate';
import { useCountdown } from './useCountdown';

export function Countdown() {
  const targetDate = getTargetDate(); // Importa de getTargetDate qual é a data e horário do jogo
  const { days, hours, minutes, seconds } = useCountdown(targetDate); // Passa para o custom hook useCountdown a data do jogo

  return (
    <div>
      <h1>A temporada 2025 da NFL começa em:</h1>
      <p>
        {days}d {hours}h {minutes}m {seconds}s
      </p>
    </div>
  );
}
