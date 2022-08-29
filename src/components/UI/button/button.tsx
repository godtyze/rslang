import React from 'react';
import './button.css';

interface btnProps {
  children?: React.ReactNode;
  className: string;
  onClick?: (el?: number) => void;
  visible?: boolean;
  difficulty?: number;
}

const MyButton: React.FC<btnProps> = ({className,
                                        children,

                                        onClick,
                                        visible,
                                        difficulty}) => {
  const onClickHandler = () => {
    if (onClick) onClick();
  }
  return (
    <button
            style={{display: visible ? 'flex' : 'none'}}
            onClick={onClickHandler}
            className={className}>
      {children}
    </button>
  );
};

export default MyButton;
