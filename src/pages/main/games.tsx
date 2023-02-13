import React from 'react';
import glossaryImg from '../../assets/png/books.png';
import audioCallImg from '../../assets/png/speaker.png';
import sprintImg from '../../assets/png/sprint.png';
import GameLink from "./game-link";

const games = [
  { path: '/glossary/1/1', name: 'Словарь', img: glossaryImg, width: '100px', height: '100px', className: 'game-image' },
  { path: '/audio-call', name: 'Аудиовызов', img: audioCallImg, width: '100px', height: '100px', className: 'game-image' },
  { path: '/sprint', name: 'Спринт', img: sprintImg, width: '175px', height: '100px', className: 'sprint-logo' },
];

const Games: React.FC = () => {
  return (
    <div className='games-wrapper'>
      <div className='all-games'>
        {games.map(game =>
        <GameLink
          key={game.name}
          img={game.img}
          path={game.path}
          name={game.name}
          width={game.width}
          height={game.height}
          className={game.className}
        />)}
      </div>
    </div>
  );
};

export default Games;
