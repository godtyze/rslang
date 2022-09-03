import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import GameWindow from "./game-window";
import DifficultyWindow from "./difficulty-window";
import './sprint.css'

const btnArr = [1, 2, 3, 4, 5, 6];

const SprintMain = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(0);

  function difficultyHandle(el: number) {
    setDifficulty(el);
    setStartGame(true)
  }

  return (
      <div>
        {startGame
            && <GameWindow diff={difficulty - 1}/>
        }
        <div style={{display: startGame ? 'none' : 'flex'}} className='main-window blur sprint'>
        </div>
        <DifficultyWindow visible={!startGame} children={
          <div className='btn-wrapper'>
            {btnArr.map(el => <MyButton key={el}
                                        onClick={() => difficultyHandle(el)}
                                        className='btn audio'
                                        visible={true}>{el}</MyButton>)}
          </div>}/>
      </div>
  );
};

export default SprintMain;
