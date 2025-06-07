import { Header } from '../../components/Header/Header';
import { MarqueeJokes } from '../../components/MarqueeJokes/MarqueeJokes';
import { ChampionCard } from './ChampionCard/ChampionCard';
import { HeroCarousel } from './HeroCarousel/HeroCarousel';

import './Home.css';

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <ChampionCard />
      <MarqueeJokes />
    </div>
  );
};
