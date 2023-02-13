import React from 'react';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import sprite from "../../assets/svg/sprite.svg";
import {Link} from "react-router-dom";
import AuthForm from "../../components/UI/auth-form/auth-form";


const Auth: React.FC = () => {
  return (
    <div className='App login'>
      <Header className='header login'>
        <Link to='/'>
          <svg className='header__link-icon'>
            <use xlinkHref={`${sprite}#home-icon`}/>
          </svg>
        </Link>
      </Header>
      <AuthForm/>
      <Footer/>
    </div>
  );
};

export default Auth;