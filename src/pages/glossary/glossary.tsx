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
import MySelect from "../../components/UI/mySelect/mySelect";
import Loader from "../../components/UI/Loader/loader";


const Glossary: React.FC = () => {
  const [words, setWords] = useState<Array<Word>>([]);
  const [page, setPage] = useState<number>(1);
  const [group, setGroup] = useState<number>(1);
  const [isWordsLoading, setIsWordsLoading] = useState<boolean>(false);

  const [fetchWords, error] = useFetching(async () => {
    const words = await PostService.getWords(page - 1, group - 1);
    setWords(words);
  });

  useEffect(() => {
    setIsWordsLoading(true);
    (fetchWords as (() => Promise<void>))();
    setIsWordsLoading(false);
  }, [page, group]);


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
      <div style={{flex: '1 0 auto', padding: '10px', display: 'flex', justifyContent: 'center'}}>
        {isWordsLoading
          ? <Loader/>
          : <div className='word__list'>
            <MySelect onSelect={(group: number) => setGroup(group)} selectedGroup={group}/>
            <WordList words={words}/>
            <Pagination
              page={page}
              onClickNext={() => setPage(page + 1)}
              onClickPrev={() => setPage(page - 1)}
              onClickFirst={() => setPage(1)}
              onClickLast={() => setPage(30)}
            />
          </div>
        }
      </div>
      <Footer/>
    </div>
  );
};

export default Glossary;