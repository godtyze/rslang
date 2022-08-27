import React, {useState} from 'react';
import './registerForm.css'
import '../input/input.css'
import MyButton from "../button/button";
import MyInput from "../input/input";

interface formProps {
    onClick?: () => void;
}


const RegisterForm: React.FC<formProps> = ({onClick}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => e.key === 'Enter' && e.preventDefault()}
            className='register-form'>
          <MyButton className={'btn form-button'} onClick={onClick} visible={true}>
            X
          </MyButton>
          <MyInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className='form-input'
              value={email}
              type='text'
              placeholder='E-mail'/>
          <MyInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              value={password}
              className='form-input'
              type='password'
              placeholder='Password'/>
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
