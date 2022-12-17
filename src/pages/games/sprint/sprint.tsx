import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../../../components/UI/button/button';
import SprintMain from "./sprint-main";

const AudioCall = () => {
  return (
      <div>
        <SprintMain/>
        <Link to='/'><MyButton className={'game-button'} visible={true}>X</MyButton>
        </Link>
      </div>
  );
};



export default AudioCall;
