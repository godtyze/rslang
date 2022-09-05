import React from 'react';

interface inputProps {
  name?: string;
  value: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
}

const MyInput: React.FC<inputProps> = ({className,
                                         type,
                                         placeholder,
                                         onChange,
                                         name,
                                         onBlur}) => {
  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }
  return (
    <input onSubmit={handleSubmit}
           onBlur={onBlur}
           name={name}
           onChange={onChange}
           className={className}
           type={type}
           placeholder={placeholder}>
    </input>
  );
};

export default MyInput;
