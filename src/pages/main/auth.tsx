import React, {useState} from 'react';
import MyButton from "../../components/UI/button/button";
import RegisterForm from "../../components/UI/registerForm/registerForm";
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {signOut} from "../../store/reducers/UserActionCreators";


const Auth: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const {isAuth} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <div className='auth-window'>
      {showButton
        && <MyButton
              className={'btn login-button'}
              onClick={() => {
                setShowForm(true);
                if (isAuth) dispatch(signOut());
              }}
              visible={showButton}>
          {isAuth ? 'Выйти' : 'Вход / Регистрация'}
          </MyButton>}
      <CSSTransition
        in={showForm}
        timeout={300}
        classNames="register-form"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <RegisterForm onClick={() => setShowForm(false)}/>
      </CSSTransition>
    </div>
  );
};

export default Auth;

