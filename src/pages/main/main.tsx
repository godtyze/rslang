import React from 'react';
import './main.css'
import '../../App.css'
import Auth from "./auth";
import Games from "./games";
import Footer from "../../components/footer/footer";


const Main: React.FC = () => {
  return (
    <div className='App'>
      <header className='main-header'>
        <Auth/>
        <div className='profile-logo'>
          <img className='main-image' src={require('../../assets/png/prof.png')} height='100' width='100'
               alt='profile-pic'/>
          <span>Профиль</span>
        </div>
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
