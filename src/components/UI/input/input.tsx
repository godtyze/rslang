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
    return (
        <input className={className}
               type={type}
               placeholder={placeholder}>
            {children}
        </input>
    );
};

export default MyInput;
