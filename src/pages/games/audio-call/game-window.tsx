import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
const wordsArr = [1, 2, 3 ,4]
interface gameProps {
  diff: number;
}



const GameWindow: React.FC<gameProps> = ({diff}) => {
  const asd = fetch(`https://react-words-example.herokuapp.com/words?group=${diff}&page=29`) ;


  useEffect(() => {

  }, [])
  return (
      <div className='audio-main'>
        <div className="timescale-wrapper">
          <h3 style={{fontSize:'25px', fontFamily:'Cursive', paddingBottom: '10px'}}>Оставшееся время:</h3>
          <div className='time-wrapper'>
          <div className="timescale">
            <div className="time"/>
          </div>
          </div>
        </div>
        {wordsArr.map(el => <MyButton key={el} className='audio-game-btn' children={`https://react-words-example.herokuapp.com/words?group=${diff}&page=29[0].word`} visible={true}/>)}
      </div>
  );
};

export default GameWindow;
