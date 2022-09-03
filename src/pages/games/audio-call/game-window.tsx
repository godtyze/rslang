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

interface gameProps {
  diff: number;
}

const GameWindow: React.FC<gameProps> = ({diff}) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [uniqueWords, setUniqueWords] = useState<Array<Word>>([]);
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [targetAnswer, setTargetAnswer] = useState<string[]>([]);
  const [barTitle, setBarTitle] = useState<string>('Подготовка:');
  const [animationTime, setAnimationTime] = useState<number>(3);
  const [animation, setAnimation] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const createRandomWords = (words: Word[]): string[] => {
    setAnimation(animation + 1);
    const randomWords: string[] = [];
    const randomAudios: string[] = [];
    const array = [...uniqueWords];
    console.log(uniqueWords)
    let random = getRandomElement(array.length - 1);
    let randomWord = array[random];
    array.splice(random, 1);
    randomWords.push(randomWord.wordTranslate);
    randomAudios.push(randomWord.audio);
    playAudio(`https://react-words-example.herokuapp.com/${randomAudios[randomAudios.length - 1]}`);
    setTargetAnswer([...targetAnswer, randomWord.wordTranslate]);
    while (randomWords.length < 4) {
      let random = getRandomElement(19);
      const randomWord = words[random];
      if (randomWords.indexOf(randomWord.wordTranslate) === -1) {
        randomWords.push(randomWord.wordTranslate);
      }
    }
    shuffle(randomWords);
    setUniqueWords(array);
    console.log(targetAnswer)
    console.log(answers)
    return randomWords;
  }

  const answerHandler = (answer: string) => {
    setAnswers([...answers, answer]);
    if (targetAnswer.length < 20) {
      setTargetAnswer([...targetAnswer, answer])

      setAnimation(animation + 1);
      setRandomWords(createRandomWords(words));
    } else {
      setEndGame(true);
    }
    console.log(targetAnswer)
    console.log(answers)
  }

  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(getRandomElement(29), diff);
    setUniqueWords(words);
    setWords(words);
    setRandomWords(createRandomWords(words));
  });

  const handleTimerEnd = () => {
    if (targetAnswer.length < 20) {
      if (targetAnswer.length !== 0) {
        setAnswers([...answers, 'no choice'])

      }
      setRandomWords(createRandomWords(words));
    } else setEndGame(true);

  }

  useEffect(() => {
    let ans = 0;
    words.forEach(el => answers.indexOf(el.wordTranslate) === targetAnswer.indexOf(el.wordTranslate) ? ans++ : '')
    setScore(ans)
  }, [answers])

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, [])

  useEffect(() => {
    if (targetAnswer.length > 0) {
      setBarTitle('Оставшееся время:')
      setAnimationTime(6)
    }
  }, [targetAnswer])

  return (
      <div className='audio-main'>
        {endGame
            &&
          <div className='result-window'>
            <span style={{color: '#FBF7F5'}} className='game-title'>Ваши результаты:</span>
            <div className='all-games'>
              <span style={{color: '#FBF7F5'}}
                    className='game-title'>{`${score} / ${targetAnswer.length}`}</span>
              <Link to='/rslang'>
                <svg className='header__link-icon'>
                  <use xlinkHref={`${sprite}#home-icon`}/>
                </svg>
              </Link>
              <Link to='/glossary'>
                <img src={glossaryLink} height='70px' width='70px'
                     alt='glossary'/>
              </Link>
            </div>
            <div className='result-list'>
              {words.map(el => (targetAnswer.indexOf(el.wordTranslate) !== -1 || answers.indexOf(`${el.wordTranslate}-`) !== -1)
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
                         src={answers.indexOf(el.wordTranslate) === targetAnswer.indexOf(el.wordTranslate)
                             ? correctAnswer
                             : wrongAnswer}
                         height='30px' width='30px' alt='answer'/>
                  </div>
                  : '')
              }
            </div>
          </div>}
        <div key={animation} className="timescale-wrapper">
          <h3 style={{fontSize: '25px', fontFamily: 'Cursive', paddingBottom: '10px'}}>{barTitle}</h3>
          <div className='time-wrapper'>
            <div style={{  animation: `loading ${animationTime}s ease-in-out forwards`}}
                 onAnimationEnd={() => handleTimerEnd()}
                 className="timescale">
              <div className="time"/>
            </div>
          </div>
        </div>
        <div style={{display: endGame ? 'none' : 'flex'}} className='answer-wrapper'>
          {randomWords.map(el => <MyButton key={el} onClick={() => answerHandler(el)}
                                           className='audio-game-btn'
                                           visible={true}>{el}</MyButton>)}
        </div>
      </div>
  );
};

export default GameWindow;
