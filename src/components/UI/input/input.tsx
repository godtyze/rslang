import React from 'react';

interface inputProps {
  name?: string;
  value: string;
  id?: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const MyInput: React.FC<inputProps> = ({className,
                                         type,
                                         placeholder,
                                         onChange,
                                         name,
                                         onBlur,
                                         autoComplete,
                                         onKeyDown,
                                         id,
                                         autoFocus,
                                         value}) => {
  const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  }
  return (
    <input onSubmit={handleSubmit}
           id={id}
           onBlur={onBlur}
           name={name}
           onChange={onChange}
           className={className}
           type={type}
           onKeyDown={onKeyDown}
           autoComplete={autoComplete}
           autoFocus={autoFocus}
           value={value}
           placeholder={placeholder}>
    </input>
  );
};

export default MyInput;
