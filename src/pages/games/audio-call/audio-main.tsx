import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import GameWindow from "./game-window";
import DifficultyWindow from "./difficulty-window";

const audioPlayer = new Audio();
const btnArr = [1, 2, 3, 4, 5, 6];

const AudioMain = () => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(0);
  useEffect(() => {
    console.log(difficulty)

  }, [difficulty])

  function difficultyHandle(el: number) {
    setDifficulty(el);
    setStartGame(true)

    //await playAudio(`https://react-words-example.herokuapp.com/files/05_2490.mp3`);
  }

  return (
      <div>
        {startGame
            && <GameWindow diff={difficulty}/>
        }
        <div style={{display: startGame ? 'none' : 'flex'}} className='audio-main blur'>
        </div>
        <DifficultyWindow visible={!startGame} children={
          <div className='btn-wrapper'>
          {btnArr.map(el => <MyButton key={el}
                                      //difficulty={el}
                                      onClick={() => difficultyHandle(el)}
                                      className='btn audio'
                                      visible={true}>{el}</MyButton>)}
        </div>}/>
      </div>
  );
};

async function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  await audioPlayer.play();

}

export default AudioMain;
