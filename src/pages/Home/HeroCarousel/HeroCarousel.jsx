import { useEffect, useState } from 'react';

import { Countdown } from '../Countdown/Countdown';

import './HeroCarousel.css';

import playersCarousel from '../../../constants/playersCarousel';

export const HeroCarousel = () => {
  const [slidesIndex, setSlidesIndex] = useState(1);
  const [duotoneColor, setDuotoneColor] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlidesIndex((prevIndex) =>
        prevIndex === playersCarousel.length ? 1 : prevIndex + 1,
      );
      setDuotoneColor((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1));
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero">
      <figure className="hero__container">
        <div className="effect-duotone__layer">
          <div
            className="effect-duotone__layer-inner"
            style={{
              '--duotone-color': `var(--color-duotone-${duotoneColor})`,
            }}
          />
        </div>
        {playersCarousel.map((slide, index) => (
          <img
            src={slide.src}
            alt={slide.alt}
            key={index}
            className={slidesIndex === index + 1 ? 'hero__active-slide' : ''}
          />
        ))}
      </figure>
      <div className="hero__inner">
        <Countdown />
      </div>
    </div>
  );
};
