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
                        <span>Словарь</span>
                    </div>
                </MyButton>
                <MyButton className='game-wrapper' visible={true}>
                    <div className='game'>
                        <img src={require('../../assets/png/speaker.png')} height='100px'
                             width='100px' alt='speaker'/>
                        <span>Аудиовызов</span>
                    </div>
                </MyButton>
                <MyButton className='game-wrapper' visible={true}>
                    <div className='game'>
                        <img src={require('../../assets/png/sprint.png')} height='100px'
                             width='175px' alt='glossary'/>
                        <span>Спринт</span>
                    </div>
                </MyButton>
            </div>
        </div>
    );
};

export default Games;
