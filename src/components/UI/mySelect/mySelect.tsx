import React, {useMemo} from 'react';
import {useAppSelector} from "../../../hooks/redux";
import {Select} from "antd";
import {useActions} from "../../../hooks/useActions";
import {useNavigate} from "react-router-dom";
import './mySelect.css';

const MySelect: React.FC = () => {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const currentGroup = useAppSelector(state => state.glossaryReducer.currentGroup);
  const {setGroup} = useActions();
  const navigate = useNavigate();

  const options = useMemo(() => [
    { value: '1', label: '1 группа слов' },
    { value: '2', label: '2 группа слов' },
    { value: '3', label: '3 группа слов' },
    { value: '4', label: '4 группа слов'},
    { value: '5', label: '5 группа слов'},
    { value: '6', label: '6 группа слов'},
    { value: 'Сложные', label: 'Сложные слова', disabled: !isAuth},
  ], [isAuth]);

  const handleChange = (value: string) => {
    if (!isNaN(+value)) {
      setGroup(+value);
      navigate(`/glossary/${value}/1`);
    } else {
      return;
    }
  };

  return (
    <Select
      className='dropdown'
      defaultValue={`${currentGroup}`}
      size='large'
      style={{ width: 250 }}
      onChange={handleChange}
      options={options}
    />
  );
};

export default MySelect;