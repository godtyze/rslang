import React from 'react';

interface winProps {
  children: React.ReactNode;
  onClick?: () => void;
  visible?: boolean;
}

const DifficultyWindow: React.FC<winProps> = ({visible, children}) => {
  return (
      <div style={{display: visible ? 'flex' : 'none'}} className='start-window'>
        <span className='game-title'>Спринт</span>
        <span className='game-text'>Во время игры в Аудиовызов вам нужно определить, соответствует ли слову указанный перевод. Сделайте как можно больше правильных ответов за 60 секунд.<br/>
                Выберите сложность:
            </span>
        {children}
      </div>
  );
};

export default DifficultyWindow;
