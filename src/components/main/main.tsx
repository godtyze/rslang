import React from 'react';
import './main.css'
import Auth from "./auth";
import Games from "./games";

const Main: React.FC = () => {
    return (
        <main className='main'>
            <Auth/>
            <div>
                <Games/>
                <div className='about'>
                <span>Изучайте иностранные языки вместе с нами!
                Благодаря нашему приложению познавать новое увлекательно и весело, опробуйте наши миниигры, и убедитесь сами<br/>
                </span>
                </div>
            </div>

            <div className='profile-logo'>
                <img src={require('../../assets/png/prof.png')} height='100' width='100'
                     alt='profile-pic'/>
                <span>Профиль</span>
            </div>
        </main>

    );
};

export default Main;
