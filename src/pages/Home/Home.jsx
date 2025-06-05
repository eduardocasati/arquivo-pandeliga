import { Header } from '../../components/Header/Header';
import { HeroCarousel } from './HeroCarousel/HeroCarousel';

import './Home.css';

export const Home = () => {
  return (
    <div>
      <Header />
      <HeroCarousel />
    </div>
  );
};
