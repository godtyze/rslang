import React, {useEffect, useState} from 'react';
import './registerForm.css'
import '../input/input.css'
import MyButton from "../button/button";
import MyInput from "../input/input";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {createUser, signIn} from "../../../store/reducers/ActionCreators";
import {User} from "../../../types/types";
import {userSlice} from "../../../store/reducers/UserSlice";

interface formProps {
    onClick?: () => void;
}

const RegisterForm: React.FC<formProps> = ({onClick}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('E-mail не может быть пустым');
    const [passwordError, setPasswordError] = useState<string>('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {error, isLoading, isAuth} = useAppSelector(state => state.userReducer);

    useEffect(() => {
      if (emailError || passwordError) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
      if (onClick && !isLoading && !error && isAuth) onClick();
    }, [emailError, passwordError, error, isAuth, isLoading]);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case 'e-mail':
          setEmailDirty(true);
          break;
        case 'password':
          setPasswordDirty(true);
          break;
      }
    };

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError('Некорректный e-mail');
        if (!e.target.value) setEmailError('E-mail не может быть пустым');
      } else {
        setEmailError('');
      }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (e.target.value.length < 8) {
        setPasswordError('Пароль должен быть не менее 8 символов');
        if (!e.target.value) setPasswordError('Пароль не может быть пустым');
      } else {
        setPasswordError('');
      }
    }

    const handleAuth = (user: User, type: string) => {
      if (type === 'register') {
        dispatch(createUser({email: user.email, password: user.password}));
      } else {
        dispatch(signIn({email: user.email, password: user.password}));
      }
    };

    return (
        <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
            onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => e.key === 'Enter' && e.preventDefault()}
            className='register-form'>
          <MyButton className={'btn form-button'} onClick={() => {
            if (onClick) onClick()
            dispatch(userSlice.actions.userSignError(''));
          }} visible={true}>
            X
          </MyButton>
          {emailDirty && emailError && <div style={{color: 'red', fontSize: '13px', textAlign: 'center'}}>{emailError}</div>}
          <MyInput
              name='e-mail'
              onChange={emailHandler}
              onBlur={handleBlur}
              className='form-input'
              value={email}
              type='text'
              autoComplete='off'
              placeholder='E-mail'/>
          {passwordDirty && passwordError && <div style={{color: 'red', fontSize: '13px', textAlign: 'center'}}>{passwordError}</div>}
          <MyInput
              name='password'
              onChange={passwordHandler}
              onBlur={handleBlur}
              value={password}
              className='form-input'
              type='password'
              placeholder='Password'/>
          {error && !isAuth &&
              <div style={{color: 'red', fontSize: '13px', textAlign: 'center'}}>{error}</div>}
          <MyButton
            className='btn enter-button'
            disabled={!formValid}
            onClick={() => handleAuth({email: email, password: password}, 'login')}
            visible={true}>
                Войти
          </MyButton>
          <MyButton
            className='btn register-button'
            disabled={!formValid}
            onClick={() => handleAuth({email: email, password: password}, 'register')}
            visible={true}>
                Регистрация
          </MyButton>
        </form>
    );
};

export default RegisterForm;
