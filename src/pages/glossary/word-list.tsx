import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../api/PostService";
import {Word} from "../../../types/types";
import WordCard from "../../components/word-card/word-card";
import './word-list.css';

const WordList = () => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(0, 0);
    setWords(words);
  });

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, []);

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