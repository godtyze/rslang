import React from 'react';
import './main.css'
import Auth from "./auth";
import Games from "./games";

const Main = () => {
    return (
        <main className='main'>
            <Auth/>
            <Games/>
            <div className='profile-logo'>
                <img src={require('../../assets/jpg/profile.jpg')} height='100' width='100' alt='profile-pic'/>
                <a>Профиль</a>
            </div>
        </main>

    );
};

export default Main;
