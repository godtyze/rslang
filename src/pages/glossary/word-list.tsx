import React from 'react';
import {Word} from "../../../types/types";
import WordCard from "../../components/word-card/word-card";
import './word-list.css';

type wordListProps = {
  words: Array<Word>;
}

const WordList: React.FC<wordListProps> = ({words}) => {
  return (
    <div className='word__cards'>
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