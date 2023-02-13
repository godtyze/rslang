import React from 'react';
import { Pagination } from 'antd';
import {useAppSelector} from '../../../hooks/redux';
import {useNavigate} from 'react-router-dom';
import './myPagination.css';

const MyPagination: React.FC = () => {
  const {isLoading, currentGroup, currentPage} = useAppSelector(state => state.glossaryReducer);
  const navigate = useNavigate();

  const onChange = (page: number) => {
    navigate(`/glossary/${currentGroup}/${page}`);
  };

  return (
    <div className='pagination'>
      <Pagination
        current={currentPage}
        disabled={isLoading}
        total={600}
        responsive={true}
        showSizeChanger={false}
        pageSize={20}
        onChange={onChange}
      />
    </div>
  );
};

export default MyPagination;