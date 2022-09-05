import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
import sprite from "../../../assets/svg/sprite.svg";
import {Link} from "react-router-dom";
import {getRandomElement, playAudio, shuffle} from "../../../utils/utils";
import glossaryLink from '../../../assets/png/books.png';
import streak1 from '../../../assets/png/1.png'
import streak2 from '../../../assets/png/2.png'
import streak3 from '../../../assets/png/3.png'
import streak4 from '../../../assets/png/4.png'

const btnArr = [{text: '❮ Не верно', class: 'wrong'}, {text: 'Верно ❯', class: 'right'}]

const STREAK = [
  {streak: 1, value: streak1},
  {streak: 2, value: streak2},
  {streak: 3, value: streak3},
  {streak: 4, value: streak4},
]

interface gameProps {
  diff: number;
}

const GameWindow: React.FC<gameProps> = ({diff}) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [targetAnswer, setTargetAnswer] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentWordTranslate, setCurrentWordTranslate] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [time, setTime] = useState<number>(60);

  const pushRandomTranslate = (words: Word[]) => {
    setCurrentWord(words[targetAnswer].word)
    const random = getRandomElement(2);
    if (random === 1) {
      setCurrentWordTranslate(words[targetAnswer].wordTranslate);
    } else setCurrentWordTranslate(words[getRandomElement(59)].wordTranslate);
  }

  const answerHandler = (ans: string) => {
    if ((ans === 'Верно ❯' && currentWordTranslate === words[targetAnswer - 1].wordTranslate)
        || ((ans === '❮ Не верно') && currentWordTranslate !== words[targetAnswer - 1].wordTranslate)) {
      if (streak < 3) {
        setStreak(streak + 1)
        setPoints(points + 10)
      } else {
        setPoints(points + streak * 10)
      }
    } else setStreak(0);
    setTargetAnswer(targetAnswer + 1);
    console.log(targetAnswer)
    console.log(streak)
    pushRandomTranslate(words);
  }

  const [fetchWords, error] = useFetching(async () => {
    const randomPage = getRandomElement(26);
    const words = await PostService.getWords(randomPage, diff);
    setWords(words.concat(await PostService.getWords(randomPage + 1, diff)).concat(await PostService.getWords(randomPage + 2, diff)));
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else setEndGame(true)
    }, 1000);
    return () => clearTimeout(timer);
  }, [time])

  useEffect(() => {
    setTimeout(() => pushRandomTranslate(words), 1)
    setTargetAnswer(targetAnswer + 1)
    console.log(words)
  }, [words])

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, [])

  return (
      <div className='main-window sprint'>
        {endGame
            &&
          <div className='result-window'>
            <span style={{color: '#F1F7F5'}} className='game-title'>Ваши результаты:</span>
            <div className='all-games'>
              <Link to='/rslang'>
                <svg className='header__link-icon'>
                  <use xlinkHref={`${sprite}#home-icon`}/>
                </svg>
              </Link>
              <Link to='/glossary/1/1'>
                <img src={glossaryLink} height='70px' width='70px'
                     alt='glossary'/>
              </Link>
            </div>
          </div>}
        <div className='game-field'>
          <div className='score-wrapper'>
            <span className='timer'>{time}</span>
            <span className='score'>{points}</span>
          </div>
          <div className='game-window'>

            <div style={{backgroundImage: `url(${STREAK[streak].value})`}} className='streak'>
            </div>
            <div className='words-container'>
              <span style={{color: 'white'}} className='game-title'>{currentWord}</span>
              <span>{currentWordTranslate}</span>
            </div>
            <div className='button-wrapper'>
              {btnArr.map(el => <MyButton key={el.text}
                                          onClick={() => answerHandler(el.text)}
                                          className={`sprint-btn ${el.class}`}
                                          visible={true}>
                {el.text}
              </MyButton>)}
            </div>
          </div>
        </div>
      </div>
  );
};

export default GameWindow;
