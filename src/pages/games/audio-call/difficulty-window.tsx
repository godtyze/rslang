import React from 'react';

interface winProps {
  children: React.ReactNode;
  onClick?: () => void;
  visible?: boolean;
}

const DifficultyWindow: React.FC<winProps> = ({visible, children}) => {
  return (
      <div style={{display: visible ? 'flex' : 'none'}} className='start-window'>
        <span className='game-title'>Аудиовызов</span>
        <span className='game-text'>Во время игры в Аудиовызов вы долны будете выбрать правильный перевод услышанного вами слова.<br/>
                Выберите сложность:
            </span>
        {children}
      </div>
  );
};

export default DifficultyWindow;
