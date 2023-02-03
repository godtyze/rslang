import React from 'react';
import WordCard from "../../components/word-card/word-card";
import {useAppSelector} from "../../hooks/redux";
import './word-list.css';

const WordList: React.FC = () => {
  const words = useAppSelector(state => state.glossaryReducer.words);

  return (
    <div className='word-cards'>
      {words.map(word =>
      <WordCard
        key={word.word}
        word={word.word}
        image={word.image}
        audio={word.audio}
        audioMeaning={word.audioMeaning}
        audioExample={word.audioExample}
        textMeaning={word.textMeaning}
        textExample={word.textExample}
        transcription={word.transcription}
        wordTranslate={word.wordTranslate}
        textMeaningTranslate={word.textMeaningTranslate}
        textExampleTranslate={word.textExampleTranslate}/>)}
    </div>
  );
};

export default WordList;