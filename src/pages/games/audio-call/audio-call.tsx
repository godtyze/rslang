import React from 'react';
import { Link } from 'react-router-dom';
import AudioMain from "../../../components/audio-call/audio-main";
import MyButton from '../../../components/UI/button/button';
import '../../../components/audio-call/audio-call.css'

const AudioCall = () => {
  return (
      <div>
        <div className='audio-main'>
        </div>
        <AudioMain/>
        <Link to='/'><MyButton className={'game-button'} visible={true}>X</MyButton>
        </Link>
      </div>
  );
};



export default AudioCall;
