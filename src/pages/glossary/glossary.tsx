import React, {useEffect, useState} from 'react';
import './glossary.css';
import Header from "../../components/header/header";
import {Link} from "react-router-dom";
import sprite from '../../assets/svg/sprite.svg';
import Navigation from "./navigation";
import WordList from "./word-list";
import {Word} from "../../../types/types";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../api/PostService";
import Pagination from "../../components/UI/pagination/pagination";
import Footer from "../../components/footer/footer";


const Glossary: React.FC = () => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [page, setPage] = useState<number>(1);

  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(page - 1);
    setWords(words);
  });

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, [page]);



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
      <WordList words={words}/>
      <Pagination
        page={page}
        onClickNext={() => setPage(page + 1)}
        onClickPrev={() => setPage(page - 1)}
        onClickFirst={() => setPage(1)}
        onClickLast={() => setPage(30)}
      />
      <Footer/>
    </div>
  );
};

export default Glossary;