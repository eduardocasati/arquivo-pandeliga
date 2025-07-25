import { Header } from '../../components';
import { ChampionCard } from './ChampionCard/ChampionCard';
import { HeroCarousel } from './HeroCarousel/HeroCarousel';
import { MarqueeJokes } from './MarqueeJokes/MarqueeJokes';

import './Home.css';

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <MarqueeJokes />
      <ChampionCard />
    </div>
  );
};
