import React, {useState} from 'react';
import MyButton from "../../components/UI/button/button";
import RegisterForm from "../../components/UI/registerForm/registerForm";
import {CSSTransition} from "react-transition-group";


const Auth: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div>
      {showButton
        && <MyButton
              className={'btn login-button'}
              onClick={() => setShowForm(true)}
              visible={showButton}>
              Вход / Регистрация
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

