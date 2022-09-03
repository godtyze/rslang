import React, {useState} from 'react';
import './word-card.css';
import {Word} from "../../../types/types";
import {server} from "../../consts/consts";
import { FastAverageColor } from 'fast-average-color';
import { AiFillSound } from 'react-icons/ai';

type wordCardProps = Omit<Word, 'id' | 'page' | 'group'>;
type averageColor = {
  color: string;
  isLight: boolean;
}

const fac = new FastAverageColor();

const WordCard: React.FC<wordCardProps> = ({word,
                                             image,
                                             audio,
                                             audioExample,
                                             audioMeaning,
                                             wordTranslate,
                                             textMeaningTranslate,
                                             textMeaning,
                                             textExample,
                                             transcription,
                                             textExampleTranslate}) => {
  const [averageColorData, setAverageColorData] = useState<averageColor>({ color: '', isLight: false });
  fac.getColorAsync(`${server}${image}`).then(color => {
    setAverageColorData({
      color: color.rgb,
      isLight: color.isLight,
    });
  });


  const audioPlayer = new Audio();
  const playWord = async (url: string, phase?: number) => {
    audioPlayer.src = `${server}${url}`;
    audioPlayer.load();
    await audioPlayer.play();

    let nextPhase: number;
    let nextAudio: string;

    if (phase === 1) {
      nextPhase = 2;
      nextAudio = audioMeaning;
    }

    if (phase === 2) {
      nextPhase = 3;
      nextAudio = audioExample;
    }

    if (phase === 3) {
      return;
    }

    const playNext = () => {
      audioPlayer.removeEventListener('ended', playNext);
      playWord(nextAudio, nextPhase);
    };

    audioPlayer.addEventListener('ended', playNext);
  };

  return (
    <div className='word__card card' style={{background: `${averageColorData.color}`}}>
      <div className='card__main' style={{background: `url(${server}${image})`}}>
        <div className='card__main-wrapper' style={{background: `linear-gradient(transparent, ${averageColorData.color})`}}>
          <h3 className='card__header'>{word}</h3>
          <div className='card__header-details'>
            <span>{wordTranslate}</span>
            <span>{transcription}</span>
            <AiFillSound onClick={() => playWord(audio, 1)} style={{cursor: 'pointer'}}/>
          </div>
        </div>
      </div>
      <div className='card__description'>
        <div className='card__description-examples'>
          <span dangerouslySetInnerHTML={{__html: textMeaning}}></span>
          <span dangerouslySetInnerHTML={{__html: textExample}}></span>
        </div>
        <div className='card__description-translate'>
          <span>{textMeaningTranslate}</span>
          <span>{textExampleTranslate}</span>
        </div>
      </div>
    </div>
  );
};

export default WordCard;