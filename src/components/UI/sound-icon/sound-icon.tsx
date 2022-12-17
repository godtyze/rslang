import React from 'react';
import soundImg from '../../../assets/png/voice-icon.png';
import './sound-icon.css';

type VoiceIconProps = {
  onClick: () => void;
}

const SoundIcon: React.FC<VoiceIconProps> = ({onClick}) => {
  return (
    <>
      <img className='sound'
           onClick={onClick}
           src={soundImg}
           alt='sound-icon'/>
    </>
  );
};

export default SoundIcon;