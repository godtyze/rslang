import React, {useEffect} from 'react';
import './glossary.css';
import Header from "../../components/header/header";
import {Link, useNavigate, useParams} from "react-router-dom";
import sprite from '../../assets/svg/sprite.svg';
import Navigation from "../../components/navigation";
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
      loadWords(currentGroup - 1, currentPage - 1);
    }
  }, [group, page]);

  const onSelect = (group: number) => {
    setGroup(group);
    navigate(`/glossary/${group}/1`);
  };

  const onClickFirst = () => {
    setPage(1);
    navigate(`/glossary/${currentGroup}/1`);
  };

  const onClickPrev = () => {
    setPage(currentPage - 1);
    navigate(`/glossary/${currentGroup}/${currentPage - 1}`);
  };

  const onClickNext = () => {
    setPage(currentPage + 1);
    navigate(`/glossary/${currentGroup}/${currentPage + 1}`);
  };

  const onClickLast = () => {
    setPage(30);
    navigate(`/glossary/${currentGroup}/30`);
  };

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
      <div className='words__wrapper'>
        {isLoading
          ? <Loader/>
          : <div className='word__list'>
              <MySelect onSelect={onSelect} currentGroup={currentGroup}/>
              <WordList words={words}/>
            </div>
        }
      </div>
      <Pagination
        page={currentPage}
        onClickFirst={onClickFirst}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        onClickLast={onClickLast}
      />
      <Footer/>
    </div>
  );
};

export default Glossary;
