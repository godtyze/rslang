import React, {useEffect, useState} from 'react';
import MyButton from "../../../components/UI/button/button";
import {Word} from "../../../../types/types";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../api/PostService";
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
  const [answer, setAnswer] = useState<string>('');
  const [targetWords, setTargetWords] = useState<string[]>([]);

  const getRandomPage = () => {
    return Math.floor(Math.random() * 29);
  }

  const getRandomWord = () => {
    return Math.floor(Math.random() * 19);
  }

  const getRandomAnswer = (arr: string[]) => {
    playAudio(`https://react-words-example.herokuapp.com/${arr[Math.floor(Math.random() * 3)]}`);

  }

  const createRandomWords = (words: Word[]): string[] => {
    const randomWords: string[] = [];
    const randomAudios: string[] = [];
    while (randomWords.length < 4) {
      let random = getRandomWord();
      const randomWord = words[random].wordTranslate;
      const randomAudio = words[random].audio;
      if (randomWords.indexOf(randomWord) === -1) {
        randomWords.push(randomWord);
        randomAudios.push(randomAudio);
      }
    }
    playAudio(`https://react-words-example.herokuapp.com/${randomAudios[Math.floor(Math.random() * 3)]}`);
    return randomWords;
  }

  const answerHandler = (answer: string) => {
    setRandomWords(createRandomWords(words));
    setAnswer(answer);
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
        <div className="timescale-wrapper">
          <h3 style={{fontSize: '25px', fontFamily: 'Cursive', paddingBottom: '10px'}}>Оставшееся
            время:</h3>
          <div className='time-wrapper'>
            <div className="timescale">
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
