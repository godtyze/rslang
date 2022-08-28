import React from 'react';
import MyButton from "../UI/button/button";
import sound from '../../assets/files/01_0001.mp3'
const audioPlayer = new Audio();
const btnArr = [1, 2, 3, 4, 5, 6];

const AudioMain = () => {
  const audioHandle = () => {
    playAudio(sound);
  }
  return (
      <div className='start-window'>
        <span className='start-window__title'>Аудиовызов</span>
        <span className='start-window__text'>Во время игры в Аудиовызов вы долны будете выбрать правильный перевод услышанного вами слова.<br/>
                Выберите сложность:
            </span>
        <div className='btn-wrapper'>
          {btnArr.map(el => <MyButton key={el} onClick={audioHandle} className='btn audio' visible={true}>{el}</MyButton>)}
        </div>
      </div>
  );
};

function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();

}

export default AudioMain;
