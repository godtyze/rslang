import React from 'react';
import './footer.css'

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <a href="https://rs.school/" className='footer__logo'></a>
            <div className='creators-wrapper'>
                <a className='creator-name' target='_blank' href='https://github.com/godtyze'>Никита Чубис</a>
                <a className='creator-name' target='_blank' href='https://github.com/AlexandrParhomenko'>Александр Пархоменко</a>
                <a className='creator-name' target='_blank' href='https://github.com/qmeister65'>Александр Семёнов</a>
            </div>
            <span className='footer__year'>2022</span>
        </footer>
    );
};

export default Footer;
