import React from 'react';
import {useNavigate} from "react-router-dom";
import '../../pages/main/main.css'

type gameProps = Record<'path' | 'name' | 'img' | 'width' | 'height' | 'className', string>

const GameLink: React.FC<gameProps> = ({path, name, img, width, height, className}) => {
  const navigate = useNavigate();
  return (
    <div className='game-wrapper'>
      <div className='game' onClick={() => navigate(path)}>
        <img
          className={className}
          src={img}
          alt={path.slice(1)}
          width={width}
          height={height}
        />
        <span>{name}</span>
      </div>
    </div>
  );
};

export default GameLink;
