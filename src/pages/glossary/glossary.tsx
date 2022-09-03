import React, {useEffect, useState} from 'react';
import './glossary.css';
import Header from "../../components/header/header";
import {Link, useNavigate, useParams} from "react-router-dom";
import sprite from '../../assets/svg/sprite.svg';
import Navigation from "./navigation";
import WordList from "./word-list";
import {glossaryParams, Word} from "../../../types/types";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../api/PostService";
import Pagination from "../../components/UI/pagination/pagination";
import Footer from "../../components/footer/footer";
import MySelect from "../../components/UI/mySelect/mySelect";
import Loader from "../../components/UI/Loader/loader";


const Glossary: React.FC = () => {
  const [words, setWords] = useState<Array<Word>>([]);
  const { group, page } = useParams<glossaryParams>();
  const navigate = useNavigate();


  const [fetchWords, isWordsLoading, error] = useFetching(async () => {
    if (group && page) {
      const words = await PostService.getWords(+page - 1, +group - 1);
      setWords(words);
    }
  });

  useEffect(() => {
    (fetchWords as (() => Promise<void>))();
  }, [page, group]);


  return (
    <div className='App glossary'>
      <Header className='header glossary'>
        <Link to='/rslang'>
          <svg className='header__link-icon'>
            <use xlinkHref={`${sprite}#home-icon`}/>
          </svg>
        </Link>
        <Navigation/>
      </Header>
      <div style={{flex: '1 0 auto', padding: '10px', display: 'flex', justifyContent: 'center'}}>
        {isWordsLoading
          ? <Loader/>
          : page && group && <div className='word__list'>
            <MySelect onSelect={(group: number) => navigate(`/glossary/${group}/${page}`)} selectedGroup={+group}/>
            <WordList words={words}/>
            <Pagination
                page={+page}
                onClickNext={() => navigate(`/glossary/${group}/${+page + 1}`)}
                onClickPrev={() => navigate(`/glossary/${group}/${+page - 1}`)}
                onClickFirst={() => navigate(`/glossary/${group}/1`)}
                onClickLast={() => navigate(`/glossary/${group}/30`)}
            />
        </div>
        }
      </div>
      <Footer/>
    </div>
  );
};

export default Glossary;
