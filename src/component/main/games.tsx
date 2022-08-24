import React from 'react';

const Games = () => {
    return (
        <div className='games-wrapper'>
            <div className='all-games'>
                <div className='game-wrapper'>
                    <div className='game glossary'>
                        <a>Словарь</a>
                    </div>
                </div>
                <div className='game-wrapper'>
                    <div className='game speaker'>
                        <a>Аудиовызов</a>
                    </div>
                </div>
                <div className='game-wrapper'>
                    <div className='game speaker'>
                        <a>Спринт</a>
                    </div>
                </div>
            </div>
            <div className='about'>
                <a>RS Lang - Изучайте иностранные языки вместе с нами!
                Благодаря нашему приложению познавать новое увлекательно и весело, опробуйте наши миниигры, и убедитесь сами<br/>
                </a>
            </div>
        </div>
    );
};

export default Games;
