import React from 'react';
import {Link} from "react-router-dom";

type gameProps = Record<'path' | 'name' | 'img' | 'width' | 'height', string>

const GameLink: React.FC<gameProps> = ({path, name, img, width, height}) => {
  return (
    <Link to={path} className='game-wrapper'>
      <div className='game'>
        <img
          src={img}
          alt={path.slice(1)}
          width={width}
          height={height}
        />
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default GameLink;
