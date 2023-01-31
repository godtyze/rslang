import React, {useState} from 'react';
import './pagination.css';
import MyButton from "../button/button";
import {useNavigate, useParams} from "react-router-dom";
import {glossaryParams} from "../../../types/types";
import MyInput from "../input/input";
import {useActions} from "../../../hooks/useActions";
import {useAppSelector} from "../../../hooks/redux";

const Pagination: React.FC = () => {
  const {isLoading, currentGroup, currentPage} = useAppSelector(state => state.glossaryReducer);
  const {setPage} = useActions();
  const { group } = useParams<glossaryParams>();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(`${currentPage}`)

  let previousPageValue = currentPage;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 30 && e.target.value !== '0') setValue(e.target.value);
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

  const onBlur = () => {
    setEditMode(false);

    if (!value) {
      setValue(`${previousPageValue}`);
      return;
    }

    if (+value !== previousPageValue) {
      setPage(+value);
      navigate(`/glossary/${group}/${value}`);
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && editMode) {
      setEditMode(false);

      if (!value) {
        setValue(`${previousPageValue}`);
        return;
      }

      if (+value !== previousPageValue) {
        setPage(+value);
        navigate(`/glossary/${group}/${value}`);
      }
    }
  };

  return (
    <div className='pagination'>
      <MyButton
        className='arr-wrapper'
        visible={true}
        disabled={isLoading || currentPage === 1}
        onClick={() => {
          setValue('1');
          onClickFirst();
        }}>&lt;&lt;</MyButton>
      <MyButton
        className='arr-wrapper'
        disabled={isLoading || currentPage === 1}
        visible={true}
        onClick={() => {
          setValue(prev => `${+prev - 1}`)
          onClickPrev();
        }}>&lt;</MyButton>
      {!editMode &&
          <label
              htmlFor='page'
              onClick={() => setEditMode(true)}
              className='arr-wrapper page'>
            {currentPage}
          </label>}
      {editMode && <MyInput
        type='text'
        id='page'
        className='arr-wrapper page'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={true}
        onKeyDown={onEnter}
        autoComplete='off'
        ></MyInput>}
      <MyButton
        className='arr-wrapper'
        disabled={isLoading || currentPage === 30}
        visible={true}
        onClick={onClickNext}>&gt;</MyButton>
      <MyButton
        className='arr-wrapper'
        disabled={isLoading || currentPage === 30}
        visible={true}
        onClick={onClickLast}>&gt;&gt;</MyButton>
    </div>
  );
};

export default Pagination;