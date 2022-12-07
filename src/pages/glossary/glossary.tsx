import React, {useEffect} from 'react';
import './glossary.css';
import Header from "../../components/header/header";
import {Link, useNavigate, useParams} from "react-router-dom";
import sprite from '../../assets/svg/sprite.svg';
import Navigation from "./navigation";
import WordList from "./word-list";
import {glossaryParams} from "../../types/types";
import Pagination from "../../components/UI/pagination/pagination";
import Footer from "../../components/footer/footer";
import MySelect from "../../components/UI/mySelect/mySelect";
import Loader from "../../components/Loader/loader";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/useActions";


const Glossary: React.FC = () => {
  const {words, isLoading, currentGroup, currentPage} = useAppSelector(state => state.glossaryReducer);
  const {setPage, setGroup, loadWords} = useActions();
  const {group, page} = useParams<glossaryParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(group)) || isNaN(Number(page))) {
      navigate('/glossary/1/1');
      return;
    }

    if (group && page && (+group > 6 || +page < 1 || +page > 30)) {
      navigate('/glossary/1/1');
      return;
    }

    if (group && page) {
      setGroup(+group);
      setPage(+page);
      loadWords(+group - 1, +page - 1);
    }
  }, [group, page]);

  return (
    <div className='App glossary'>
      <Header className='header glossary'>
        <Link to='/'>
          <svg className='header__link-icon'>
            <use xlinkHref={`${sprite}#home-icon`}/>
          </svg>
        </Link>
        <Navigation/>
      </Header>
      <div style={{flex: '1 0 auto', padding: '10px', display: 'flex', justifyContent: 'center'}}>
        {isLoading
          ? <Loader/>
          : page && group && <div className='word__list'>
          <MySelect onSelect={(group: number) => {
            setGroup(group);
            navigate(`/glossary/${group}/1`);
          }} selectedGroup={+group}/>
          <WordList words={words}/>
          <Pagination
            page={currentPage}
            onClickNext={() => {
              setPage(currentPage + 1);
              navigate(`/glossary/${currentGroup}/${currentPage + 1}`);
            }}
            onClickPrev={() => {
              setPage(currentPage - 1);
              navigate(`/glossary/${currentGroup}/${currentPage - 1}`);
            }}
            onClickFirst={() => {
              setPage(1);
              navigate(`/glossary/${currentGroup}/1`);
            }}
            onClickLast={() => {
              setPage(30);
              navigate(`/glossary/${currentGroup}/30`);
            }}
          />
        </div>
        }
      </div>
      <Footer/>
    </div>
  );
};

export default Glossary;
