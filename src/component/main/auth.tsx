import React from 'react';

function showEnterWindow() {

}

const Auth = () => {
    return (
        <div className='button-wrapper'>
            <div onClick={showEnterWindow} className="login-button">Вход / Регистрация</div>
        </div>
    );
};

export default Auth;
