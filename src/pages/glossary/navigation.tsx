import React from 'react';
import GameLink from "../main/game-link";
import audioCallImg from "../../assets/png/speaker.png";
import sprintImg from "../../assets/png/sprint.png";


const Navigation: React.FC = () => {
  return (
  <nav className='header__nav nav'>
    <GameLink
      path='/audio-call'
      img={audioCallImg}
      width='50px'
      height='50px'
      name='Аудиовызов'
    />
    <GameLink
      path='/sprint'
      img={sprintImg}
      width='100px'
      height='60px'
      name='Спринт'
    />
  </nav>
  );
};

export default Navigation;