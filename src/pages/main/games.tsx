import React from 'react';
import MyButton from "../../components/UI/button/button";
import {Link} from "react-router-dom";

const Games: React.FC = () => {
  return (
    <div className='games-wrapper'>
      <div className='all-games'>
        <Link to='/glossary'>
          <MyButton className='game-wrapper' visible={true}>
            <div className='game'>
              <img src={require('../../assets/png/books.png')} height='100px'
                   width='100px' alt='glossary'/>
              <span>Словарь</span>
            </div>
          </MyButton>
        </Link>
        <Link to='/audio-call'>
          <MyButton className='game-wrapper' visible={true}>
            <div className='game'>
              <img src={require('../../assets/png/speaker.png')} height='100px'
                   width='100px' alt='speaker'/>
              <span>Аудиовызов</span>
            </div>
          </MyButton>
        </Link>
        <Link to='/sprint'>
          <MyButton className='game-wrapper' visible={true}>
            <div className='game'>
              <img src={require('../../assets/png/sprint.png')} height='100px'
                   width='175px' alt='glossary'/>
              <span>Спринт</span>
            </div>
          </MyButton>
        </Link>
      </div>
    </div>
  );
};

export default Games;
