import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
import glossaryImg from "../../../assets/png/books.png";
import audioCallImg from "../../../assets/png/speaker.png";
import sprintImg from "../../../assets/png/sprint.png";
import GameLink from "../../main/game-link";
import sprite from "../../../assets/svg/sprite.svg";
import {Link} from "react-router-dom";
const audioPlayer = new Audio();


interface gameProps {
  diff: number;
}

async function playAudio(url: string) {
  audioPlayer.src = url;
  audioPlayer.load();
  await audioPlayer.play();
}

const GameWindow: React.FC<gameProps> = ({diff}) => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [targetAnswer, setTargetAnswer] = useState<string[]>([]);
  const [animation, setAnimation] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);

  const getRandomPage = () => {
    return Math.floor(Math.random() * 29);
  }

  const getRandomWord = () => {
    return Math.floor(Math.random() * 19);
  }

  const getRandomAnswer = () => {
    return Math.floor(Math.random() * 3);
  }

  const createRandomWords = (words: Word[]): string[] => {
    setAnimation(animation + 1);
    const randomWords: string[] = [];
    const randomAudios: string[] = [];
    while (randomWords.length < 4) {
      let random = getRandomWord();
      const randomWord = words[random];
      if (randomWords.indexOf(randomWord.wordTranslate) === -1) {
        randomWords.push(randomWord.wordTranslate);
        randomAudios.push(randomWord.audio);
      }
    }
    const createUnique = () => {
      let randomAns = getRandomAnswer();
      if (targetAnswer.indexOf(randomWords[randomAns]) === -1) {
        setTargetAnswer([...targetAnswer, randomWords[randomAns]]);
        playAudio(`https://react-words-example.herokuapp.com/${randomAudios[randomAns]}`);
      } else createUnique()
    }
    createUnique()
    console.log(targetAnswer)
    console.log(answers)
    return randomWords;
  }

  const answerHandler = (answer: string) => {
    setAnswers([...answers, answer]);
    if (targetAnswer.length < 5) {
      setTargetAnswer([...targetAnswer, answer])
      setAnimation(animation + 1);
      setRandomWords(createRandomWords(words));
    } else setEndGame(true);
  }

  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(getRandomPage(), diff);
    setWords(words);
    setRandomWords(createRandomWords(words));
  });

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, [])

  return (
      <div className='audio-main'>
        {endGame
            &&
          <div className='result-window'>
            <span style={{color: '#FBF7F5'}} className='game-title'>Ваши результаты:</span>
            <div className='all-games'>
              <Link to='/rslang'>
                <svg className='header__link-icon'>
                  <use xlinkHref={`${sprite}#home-icon`}/>
                </svg>
              </Link>
              <Link to='/glossary'>
                <img src={require('../../../assets/png/books.png')} height='70px' width='70px'/>
              </Link>
            </div>
            <div className='result-list'>

              {words.map(el => answers.indexOf(el.wordTranslate) !== -1
                  ? <div className='result-list__item' key={el.id}>
                    <img key={el.audio} src={require('../../../assets/png/voice-icon.png')} height='30px' width='30px' alt='voice-icon'/>
                    <span key={el.word} style={{color: '#FBF7F5'}}
                          className='game-text'>{el.word}</span>
                    <span key={el.transcription} style={{color: '#FBF7F5'}}
                          className='game-text'>{el.transcription}</span>
                    <span key={el.wordTranslate} style={{color: '#FBF7F5'}}
                          className='game-text'>{el.wordTranslate}</span>
                    <img key={el.image} src={require('../../../assets/png/correctans.png')} height='30px' width='30px'/>
                  </div>
                  : '')
                //answers.map(el => <span style={{color: '#FBF7F5'}} className='game-text'>{el}</span>)
              }
            </div>
          </div>}
        <div key={animation} className="timescale-wrapper">
          <h3 style={{fontSize: '25px', fontFamily: 'Cursive', paddingBottom: '10px'}}>Оставшееся
            время:</h3>
          <div className='time-wrapper'>
            {/*onAnimationEnd={() => setRandomWords(createRandomWords(words))}*/}
            <div
                className="timescale">
              <div className="time"/>
            </div>
          </div>
        </div>
        <div className='answer-wrapper'>
          {randomWords.map(el => <MyButton key={el} onClick={() => answerHandler(el)}
                                           className='audio-game-btn'
                                           visible={true}>{el}</MyButton>)}
        </div>
      </div>
  );
};

export default GameWindow;
