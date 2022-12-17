import React from 'react';
import './header.css';

type headerProps = {
  children?: React.ReactNode;
  className: string;
}

const Header: React.FC<headerProps> = ({children, className}) => {
  return (
    <header className={className}>
      {children}
    </header>
  );
};

export default Header;