import React from 'react';

interface inputProps {
  value: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
}

const MyInput: React.FC<inputProps> = ({className, type, placeholder, onChange}) => {
  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }
  return (
    <input onSubmit={handleSubmit}
           onChange={onChange}
           className={className}
           type={type}
           placeholder={placeholder}>
    </input>
  );
};

export default MyInput;
