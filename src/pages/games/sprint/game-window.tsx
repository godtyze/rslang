import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
import sprite from "../../../assets/svg/sprite.svg";
import {Link} from "react-router-dom";
import {getRandomElement, playAudio} from "../../../utils/utils";
import glossaryLink from '../../../assets/png/books.png';
import streak1 from '../../../assets/png/1.png'
import streak2 from '../../../assets/png/2.png'
import streak3 from '../../../assets/png/3.png'
import streak4 from '../../../assets/png/4.png'
import voiceLink from "../../../assets/png/voice-icon.png";
import correctAnswer from "../../../assets/png/correctans.png";
import wrongAnswer from "../../../assets/png/wrongans.png";

const btnArr = [{text: '❮ Не верно', class: 'wrong'}, {text: 'Верно ❯', class: 'right'}]

const STREAK = [
  {streak: 1, value: streak1, border: 'none'},
  {streak: 2, value: streak2, border: '1px #ffbd15 solid'},
  {streak: 3, value: streak3, border: '2px #ff6715 solid'},
  {streak: 4, value: streak4, border: '3px #ff3e15 solid'},
]

interface gameProps {
  diff: number;
}

const GameWindow: React.FC<gameProps> = ({diff}) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [userWords, setUserWords] = useState<Array<string>>([]);
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
      setUserWords([...userWords, words[targetAnswer - 1].word])
      if (streak < 3) {
        setStreak(streak + 1)
        setPoints(points + 10)
      } else {
        setPoints(points + streak * 10)
      }
    } else {
      setUserWords([...userWords, words[targetAnswer - 1].wordTranslate])
      setStreak(0);
    }
    setTargetAnswer(targetAnswer + 1);
    pushRandomTranslate(words);
  }

  const [fetchWords] = useFetching(async () => {
    const randomPage = getRandomElement(26);
    const words = await PostService.getWords(diff, randomPage);
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
              <span style={{color: '#F1F7F5'}} className='game-title'>Ваш счёт: {points}</span>
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
            <div className='result-list'>
              {words.map((el, idx) => (idx < targetAnswer)
                  ? <div className='result-list__item' key={el.id}>
                    <img style={{cursor: 'pointer'}}
                         onClick={() => playAudio(`https://react-words-example.herokuapp.com/${el.audio}`)}
                         key={el.audio} src={voiceLink}
                         height='30px'
                         width='30px'
                         alt='voice-icon'/>
                    <span key={el.word}
                          style={{color: '#FBF7F5'}}
                          className='game-text'>{el.word}</span>
                    <span key={el.transcription}
                          style={{color: '#FBF7F5'}}
                          className='game-text'>{el.transcription}</span>
                    <span key={el.wordTranslate}
                          style={{color: '#FBF7F5'}}
                          className='game-text'>{el.wordTranslate}</span>
                    <img key={el.image}
                         src={el.word === userWords[idx - 1]
                             ? correctAnswer
                             : wrongAnswer}
                         height='30px' width='30px' alt='answer'/>
                  </div>
                  : '')
              }
            </div>
          </div>}
        <div style={{display: endGame ? 'none' : 'flex'}} className='game-field'>
          <div className='score-wrapper'>
            <span className='timer'>{time}</span>
            <span className='score'>{points}</span>
          </div>
          <div className='game-window'>

            <div style={{backgroundImage: `url(${STREAK[streak].value})`, border: STREAK[streak].border}} className='streak'>
            </div>
            <div className='words-container'>
              <span style={{color: 'white'}} className='game-title'>{currentWord}</span>
              <span className='game-translate'>{currentWordTranslate}</span>
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
