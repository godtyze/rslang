import React from 'react';
import './glossary.css';
import Header from "../../components/header/header";
import {Link} from "react-router-dom";
import sprite from '../../assets/svg/sprite.svg';
import Navigation from "./navigation";
import WordList from "./word-list";


const Glossary: React.FC = () => {
  return (
    <div className='App glossary'>
      <Header className='header glossary'>
        <Link to='/rslang'>
          <svg className='header__link-icon'>
            <use xlinkHref={`${sprite}#home-icon`}></use>
          </svg>
        </Link>
        <Navigation/>
      </Header>
      <WordList/>
    </div>
  );
};

export default Glossary;