import { useEffect, useState } from 'react';

const padNumber = (number) => {
  return number.toString().padStart(2, '0');
};

export function useDraftCountdown(targetDate) {
  const getTimeLeft = () => {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    const seconds = padNumber(Math.floor((distance / 1000) % 60));
    const minutes = padNumber(Math.floor((distance / 1000 / 60) % 60));
    const hours = padNumber(Math.floor((distance / (1000 * 60 * 60)) % 24));
    const days = padNumber(Math.floor(distance / (1000 * 60 * 60 * 24)));

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
