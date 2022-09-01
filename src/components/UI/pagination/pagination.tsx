import React from 'react';
import './pagination.css';
import MyButton from "../button/button";

type paginationProps = {
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickFirst: () => void;
  onClickLast: () => void;
  page: number;
}

const Pagination: React.FC<paginationProps> = ({onClickFirst,
                                                 onClickLast,
                                                 onClickNext,
                                                 onClickPrev,
                                                 page}) => {
  return (
    <div className='pagination'>
      <MyButton
        className={page === 1 ? 'arr-wrapper disabled-btn' : 'arr-wrapper'}
        visible={true}
        onClick={onClickFirst}>&lt;&lt;</MyButton>
      <MyButton
        className={page === 1 ? 'arr-wrapper disabled-btn' : 'arr-wrapper'}
        visible={true}
        onClick={onClickPrev}>&lt;</MyButton>
      <MyButton
        className='arr-wrapper page'
        visible={true}>{page}</MyButton>
      <MyButton
        className={page === 30 ? 'arr-wrapper disabled-btn' : 'arr-wrapper'}
        visible={true}
        onClick={onClickNext}>&gt;</MyButton>
      <MyButton
        className={page === 30 ? 'arr-wrapper disabled-btn' : 'arr-wrapper'}
        visible={true}
        onClick={onClickLast}>&gt;&gt;</MyButton>
    </div>
  );
};

export default Pagination;