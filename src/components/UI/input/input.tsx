import React from 'react';

interface inputProps {
    children?: React.ReactNode;
    className: string;
    onClick?: () => void;
    onSubmit?: () => void;
    type: string;
    placeholder: string;
}

const MyInput: React.FC<inputProps> = ({className, type, placeholder, children}) => {
    const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    }
    return (
        <input onSubmit={handleSubmit} className={className}
               type={type}
               placeholder={placeholder}>
            {children}
        </input>
    );
};

export default MyInput;
