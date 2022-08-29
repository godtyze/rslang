import React from 'react';
import glossaryImg from '../../assets/png/books.png';
import audioCallImg from '../../assets/png/speaker.png';
import sprintImg from '../../assets/png/sprint.png';
import Game from "./game";

const games = [
  { path: '/glossary', name: 'Словарь', img: glossaryImg, width: '100px', height: '100px' },
  { path: '/audio-call', name: 'Аудиовызов', img: audioCallImg, width: '100px', height: '100px' },
  { path: '/sprint', name: 'Спринт', img: sprintImg, width: '175px', height: '100px' },
];

const Games: React.FC = () => {
  return (
    <div className='games-wrapper'>
      <div className='all-games'>
        {games.map(game =>
        <Game
          key={game.name}
          img={game.img}
          path={game.path}
          name={game.name}
          width={game.width}
          height={game.height}
        />)}
      </div>
    </div>
  );
};

export default Games;
