// Custom hook que lida com o cálculo de quanto tempo falta para o primeiro jogo da temporada
import { useEffect, useState } from 'react';

export function useCountdown(targetDate) {
  const getTimeLeft = () => {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((distance / 1000) % 60);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
