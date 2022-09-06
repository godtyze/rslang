import React from 'react';
import './button.css';

interface btnProps {
  children?: React.ReactNode;
  disabled?: boolean;
  className: string;
  onClick?: (el?: number) => void;
  onKeyDown?: () => void;
  visible?: boolean;
}

const MyButton: React.FC<btnProps> = ({className,
                                        children,
                                        onKeyDown,
                                        onClick,
                                        visible,
                                        disabled}) => {
  const onClickHandler = () => {
    if (onClick) onClick();
  }
  return (
    <button
            style={{display: visible ? 'flex' : 'none'}}
            onClick={onClickHandler}
            onKeyDown={onKeyDown}
            disabled={disabled}
            className={className}>
      {children}
    </button>
  );
};

export default MyButton;
