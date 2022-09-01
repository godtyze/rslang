import React, {useState} from 'react';
import './mySelect.css';
import { FaCaretDown } from 'react-icons/fa';

type selectProps = {
  onSelect: (group: number) => void;
  selectedGroup: number;
}

const MySelect: React.FC<selectProps> = ({onSelect, selectedGroup}) => {
  const [isActive, setIsActive] = useState(false);
  const options = [1, 2, 3, 4, 5, 6];
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selectedGroup} группа слов
        <FaCaretDown/>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={() => {
                onSelect(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option} группа слов
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySelect;