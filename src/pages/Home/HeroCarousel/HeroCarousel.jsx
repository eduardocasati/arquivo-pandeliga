import { useEffect, useState } from 'react';

import playersCarousel from '../../../constants/playersCarousel';

import './HeroCarousel.css';

export const HeroCarousel = () => {
  const [slidesIndex, setSlidesIndex] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlidesIndex((prevIndex) =>
        prevIndex === playersCarousel.length ? 1 : prevIndex + 1,
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero">
      <figure className="hero__container">
        <div className="effect-duotone__layer">
          <div className="effect-duotone__layer-inner" />
        </div>
        {playersCarousel.map((slide, index) => (
          <img
            src={slide.src}
            alt={slide.alt}
            key={index}
            className={slidesIndex === index + 1 ? 'active-slide' : ''}
          />
        ))}
      </figure>
      <div className="hero__inner"></div>
    </div>
  );
};
