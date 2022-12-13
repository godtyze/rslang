import React from 'react';
import './main.css'
import '../../App.css'
import Games from "./games";
import Footer from "../../components/footer/footer";
import {useAppSelector} from "../../hooks/redux";
import MyButton from "../../components/UI/button/button";
import {useNavigate} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {RouteNames} from "../../consts/consts";


const Main: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const {signOut} = useActions();

  return (
    <div className='App'>
      <header className='main-header'>
        <MyButton
          className={'btn login-button'}
          onClick={() => {
            if (isAuth) {
              signOut();
            } else {
              navigate(RouteNames.login);
            }
          }}
          visible={true}>
          {isAuth ? 'Выйти' : 'Вход / Регистрация'}
        </MyButton>
        {isAuth &&
          <div className='profile-logo'>
            <img className='main-image' src={require('../../assets/png/prof.png')} height='100' width='100'
                 alt='profile-pic'/>
            <span>Профиль</span>
          </div>
        }
      </header>
      <main className='main'>
        <Games/>
        <div className='about'>
            <span>Изучайте иностранные языки вместе с нами!
                Благодаря нашему приложению познавать новое увлекательно и весело, опробуйте наши миниигры, и убедитесь сами<br/>
            </span>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Main;
