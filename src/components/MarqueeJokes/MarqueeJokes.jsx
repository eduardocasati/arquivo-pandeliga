import marqueeJokes from '../../constants/marqueeJokes.jsx';

import './MarqueeJokes.css';

export const MarqueeJokes = () => {
  return (
    <div className="jokes-marquee">
      <div className="jokes-marquee__content scroll">
        <ul>
          {marqueeJokes.map((jokes, index) => (
            <li key={index}>
              {jokes.joke}
              {jokes.author}
            </li>
          ))}
        </ul>
      </div>

      {/* é necessário repetir o código para evitar o gap quando o conteúdo termina */}
      <div className="jokes-marquee__content scroll">
        <ul>
          {marqueeJokes.map((jokes, index) => (
            <li key={index}>
              {jokes.joke}
              {jokes.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
