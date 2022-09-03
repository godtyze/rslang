import React from 'react';
import { Link } from 'react-router-dom';
import AudioMain from "./audio-main";
import MyButton from '../../../components/UI/button/button';
import './audio-call.css'

const AudioCall = () => {
  return (
      <div>
        <AudioMain/>
        <Link to='/rslang'><MyButton className={'game-button'} visible={true}>X</MyButton>
        </Link>
      </div>
  );
};



export default AudioCall;
