import { Header } from '../../components/Header/Header';
import { ChampionCard } from './ChampionCard/ChampionCard';
import { HeroCarousel } from './HeroCarousel/HeroCarousel';

import './Home.css';

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <ChampionCard />
    </div>
  );
};
