// import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
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
      {/* <Footer /> */}
    </div>
  );
};
