import React from 'react';
import MyButton from "../UI/button/button";

const Games: React.FC = () => {
    return (
        <div className='games-wrapper'>
            <div className='all-games'>
                <MyButton className='game-wrapper' visible={true}>
                    <div className='game'>
                        <img src={require('../../assets/png/books.png')} height='100px'
                             width='100px' alt='glossary'/>
                        <a>Словарь</a>
                    </div>
                </MyButton>
                <MyButton className='game-wrapper' visible={true}>
                    <div className='game'>
                        <img src={require('../../assets/png/speaker.png')} height='100px'
                             width='100px' alt='speaker'/>
                        <a>Аудиовызов</a>
                    </div>
                </MyButton>
                <MyButton className='game-wrapper' visible={true}>
                    <div className='game'>
                        <img src={require('../../assets/png/sprint.png')} height='100px'
                             width='175px' alt='glossary'/>
                        <a>Спринт</a>
                    </div>
                </MyButton>
            </div>
        </div>
    );
};

export default Games;
