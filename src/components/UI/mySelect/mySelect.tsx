import React, {useMemo} from 'react';
import {useAppSelector} from "../../../hooks/redux";
import {Select} from "antd";
import './mySelect.css';

type selectProps = {
  onSelect: (group: number) => void;
  currentGroup: number;
}

const MySelect: React.FC<selectProps> = ({onSelect, currentGroup}) => {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);

  const options = useMemo(() => [
    { value: '1', label: '1 группа слов' },
    { value: '2', label: '2 группа слов' },
    { value: '3', label: '3 группа слов' },
    { value: '4', label: '4 группа слов'},
    { value: '5', label: '5 группа слов'},
    { value: '6', label: '6 группа слов'},
    { value: 'Сложные', label: 'Сложные слова', disabled: !isAuth},
  ], [isAuth]);

  const handleSelect = (value: string) => {
    if (!isNaN(+value)) {
      onSelect(+value);
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
      onSelect={handleSelect}
      options={options}
    />
  );
};

export default MySelect;