import React, { useRef, useState } from 'react';
import './main.css'
import '../../App.css'
import Auth from "./auth";
import Games from "./games";
import Footer from "../../components/footer/footer";
import {useAppSelector} from "../../hooks/redux";


const Main: React.FC = () => {
  const {isAuth} = useAppSelector(state => state.userReducer);
  const [descriptionText, setDescriptionText] = useState<number>(1);

  return (
    <div className='App'>
      <header className='main-header'>
        <Auth/>
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
            {descriptionText === 0
                ? <span>Изучайте иностранные языки вместе с нами!
                Благодаря нашему приложению познавать новое увлекательно и весело, опробуйте наши миниигры, и убедитесь сами<br/>
                </span>
                : <div>
                  <span>Наша команда:</span>
                </div>}
            <div className='btn-wrap'>
              <button onClick={() => setDescriptionText(0)} className={descriptionText === 0 ? 'authors-button active' : 'authors-button'}></button>
              <button onClick={() => setDescriptionText(1)} className={descriptionText === 1 ? 'authors-button active' : 'authors-button'}></button>
            </div>
          </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Main;
