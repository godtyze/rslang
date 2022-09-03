import React from 'react';
import {useNavigate} from "react-router-dom";

type gameProps = Record<'path' | 'name' | 'img' | 'width' | 'height', string>

const GameLink: React.FC<gameProps> = ({path, name, img, width, height}) => {
  const navigate = useNavigate();
  return (
    <div className='game-wrapper'>
      <div className='game' onClick={() => navigate(path)}>
        <img
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
