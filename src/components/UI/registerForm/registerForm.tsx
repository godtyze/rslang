import React from 'react';
import './registerForm.css'
import '../input/input.css'
import MyButton from "../button/button";
import MyInput from "../input/input";

interface formProps {
    children?: React.ReactNode;
}


const RegisterForm: React.FC<formProps> = ({children}) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <form
            onSubmit={handleSubmit}
            className='register-form'>

            {children}
            <MyInput className='form-input' type='text' placeholder='E-mail'/>
            <MyInput className='form-input' type='text' placeholder='Password'/>
            <MyButton className='btn enter-button' visible={true}>
                Войти
            </MyButton>
            <MyButton className='btn register-button' visible={true}>
                Регистрация
            </MyButton>

        </form>
    );
};

export default RegisterForm;
