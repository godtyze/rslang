import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
import sprite from "../../../assets/svg/sprite.svg";
import {Link} from "react-router-dom";
import {getRandomElement, playAudio, shuffle} from "../../../utils/utils";
import glossaryLink from '../../../assets/png/books.png';
import voiceLink from '../../../assets/png/voice-icon.png';
import correctAnswer from '../../../assets/png/correctans.png';
import wrongAnswer from '../../../assets/png/wrongans.png';
import streak1 from'../../../assets/png/1.png'
import streak2 from'../../../assets/png/2.png'
import streak3 from'../../../assets/png/3.png'
import streak4 from'../../../assets/png/4.png'
const btnArr = [{text: '❮ Не верно', class: 'wrong'}, {text: 'Верно ❯', class: 'right'}]


interface gameProps {
  diff: number;
}

const GameWindow: React.FC<gameProps> = ({diff}) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [uniqueWords, setUniqueWords] = useState<Array<Word>>([]);
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [targetAnswer, setTargetAnswer] = useState<number>(0);
  const [barTitle, setBarTitle] = useState<string>('Подготовка:');
  const [animationTime, setAnimationTime] = useState<number>(3);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentWordTranslate, setCurrentWordTranslate] = useState<string>('');
  const [points, setPoints] = useState<number>(0);

  const pushRandomTranslate = (words: Word[]) => {
    setCurrentWord(words[targetAnswer].word)
    const random = getRandomElement(2);
    if (random === 1) {
      setCurrentWordTranslate(words[targetAnswer].wordTranslate);
    } else setCurrentWordTranslate(words[getRandomElement(59)].wordTranslate);

  }

  const answerHandler = (ans: string) => {
    console.log(currentWordTranslate)
    console.log(currentWord)
    if (ans === 'Верно ❯' && currentWord === currentWordTranslate) {
      setPoints(points + 1)
    }
  }

  const [fetchWords, error] = useFetching(async () => {
    const randomPage = getRandomElement(26);
    const words = await PostService.getWords(randomPage, diff);
    setWords(words.concat(await PostService.getWords(randomPage + 1, diff)).concat(await PostService.getWords(randomPage + 2, diff)));
    //setTimeout(() => pushRandomTranslate(words), 2)

    //setTimeout(() => pushRandomTranslate(words[targetAnswer]), 2)
  });

  // useEffect(() => {
  //   let ans = 0;
  //   words.forEach(el => answers.indexOf(el.wordTranslate) === targetAnswer.indexOf(el.wordTranslate) ? ans++ : '')
  //   setScore(ans)
  // }, [answers])

  (useEffect(() => {
    setTimeout(() => pushRandomTranslate(words), 2)
  }, [words]))

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
            <span className='timer'>60</span>
            <span className='score'>{points}</span>
          </div>
          <div className='game-window'>

            <div style={{backgroundImage: `url(${streak1})`}} className='streak'>
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
              {/*<MyButton onClick={() => answerHandler()}*/}
              {/*          className='sprint-btn wrong'*/}
              {/*          visible={true}>*/}
              {/*  */}
              {/*</MyButton>*/}
              {/*<MyButton onClick={() => answerHandler()}*/}
              {/*          className='sprint-btn right'*/}
              {/*          visible={true}>*/}
              {/*  Верно ❯*/}
              {/*</MyButton>*/}
            </div>
          </div>
        </div>
      </div>
  );
};

export default GameWindow;
