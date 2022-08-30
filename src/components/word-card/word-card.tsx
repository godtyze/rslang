import React, {useState} from 'react';
import './word-card.css';
import {Word} from "../../../types/types";
import {server} from "../../consts/consts";
import { FastAverageColor } from 'fast-average-color';

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


  return (
    <div className='word__card card' style={{background: `${averageColorData.color}`}}>
      <div className='card__main' style={{background: `url(${server}${image})`}}>
        <div className='card__main-wrapper' style={{background: `linear-gradient(transparent, ${averageColorData.color})`}}>
          <h3 className='card__header'>{word}</h3>
          <div className='card__header-details'>
            <span>{wordTranslate}</span>
            <span>{transcription}</span>
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