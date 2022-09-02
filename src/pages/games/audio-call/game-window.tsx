import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
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
  const [uniqueWords, setUniqueWords] = useState<Array<Word>>([]);
  const [randomWords, setRandomWords] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [targetAnswer, setTargetAnswer] = useState<string[]>([]);
  const [animation, setAnimation] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const getRandomElement = (n: number) => {
    return Math.floor(Math.random() * n);
  }

  function shuffle(arr: string[]) {
    let currentIndex = arr.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  const createRandomWords = (words: Word[]): string[] => {
    setAnimation(animation + 1);
    const randomWords: string[] = [];
    const randomAudios: string[] = [];
    while (randomWords.length < 4) {
      let random = getRandomElement(19);
      const randomWord = words[random];
      if (randomWords.indexOf(randomWord.wordTranslate) === -1) {
        //targetWords.forEach((el, idx) => el.wordTranslate === randomWord.wordTranslate ? setTargetWords(targetWords.splice(idx , 1)) : '')
        randomWords.push(randomWord.wordTranslate);
        randomAudios.push(randomWord.audio);
      }
    }

    const createUnique = () => {
      let randomAns = getRandomElement(3);
      if (targetAnswer.indexOf(randomWords[randomAns]) === -1) {
        setTargetAnswer([...targetAnswer, randomWords[randomAns]]);
        playAudio(`https://react-words-example.herokuapp.com/${randomAudios[randomAns]}`);
      } else createUnique()
    }
    createUnique()
    return randomWords;
  }

  const answerHandler = (answer: string) => {
    //setScore((targetAnswer[targetAnswer.length - 1] === answers[answers.length - 1]) ? score + 1 : score)

    setAnswers([...answers, answer]);
    if (targetAnswer.length < 20) {
      setTargetAnswer([...targetAnswer, answer])
      setAnimation(animation + 1);
      setRandomWords(createRandomWords(words));
    } else {
      // let ans = 0;
      // targetAnswer.forEach(el => targetAnswer.indexOf(el) === answers.indexOf(el) ? ans + 1 : ans)
      // setScore(ans)
      let ans = 0;
      words.forEach(el => answers.indexOf(el.wordTranslate) === targetAnswer.indexOf(el.wordTranslate) ? ans++ : '')
      setScore(ans)
      setEndGame(true);
    }
    console.log(targetAnswer)
    console.log(answers)
  }

  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(getRandomElement(29), diff);
    setWords(words);
    setRandomWords(createRandomWords(words));
  });

  const handleTimerEnd = () => {
    if (targetAnswer.length < 20) {
      setAnswers([...answers, `${targetAnswer[targetAnswer.length - 1]}-`]);
      setRandomWords(createRandomWords(words));
    } else setEndGame(true);

  }

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
              <span style={{color: '#FBF7F5'}}
                    className='game-title'>{`${score} / ${targetAnswer.length}`}</span>
              <Link to='/rslang'>
                <svg className='header__link-icon'>
                  <use xlinkHref={`${sprite}#home-icon`}/>
                </svg>
              </Link>
              <Link to='/glossary'>
                <img src={require('../../../assets/png/books.png')} height='70px' width='70px'
                     alt='glossary'/>
              </Link>
            </div>
            <div className='result-list'>
              {words.map(el => (targetAnswer.indexOf(el.wordTranslate) !== -1 || answers.indexOf(`${el.wordTranslate}-`) !== -1)
                  ? <div className='result-list__item' key={el.id}>
                    <img style={{cursor: 'pointer'}}
                         onClick={() => playAudio(`https://react-words-example.herokuapp.com/${el.audio}`)}
                         key={el.audio} src={require('../../../assets/png/voice-icon.png')}
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
                             ? require('../../../assets/png/correctans.png')
                             : require('../../../assets/png/wrongans.png')}
                         height='30px' width='30px' alt='answer'/>
                  </div>
                  : '')
              }
            </div>
          </div>}
        <div key={animation} className="timescale-wrapper">
          <h3 style={{fontSize: '25px', fontFamily: 'Cursive', paddingBottom: '10px'}}>Оставшееся
            время:</h3>
          <div className='time-wrapper'>
            <div onAnimationEnd={() => handleTimerEnd()}
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
