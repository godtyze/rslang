import React from 'react';
import './button.css';

interface btnProps {
  children?: React.ReactNode;
  className: string;
  onClick?: () => void;
  visible?: boolean;
}

const MyButton: React.FC<btnProps> = ({className, children, onClick, visible}) => {
  return (
    <button style={{display: visible ? 'flex' : 'none'}}
            onClick={onClick}
            className={className}>
      {children}
    </button>
  );
};

export default MyButton;
