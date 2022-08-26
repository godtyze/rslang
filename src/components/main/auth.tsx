import React, {useState} from 'react';
import MyButton from "../UI/button/button";
import RegisterForm from "../UI/registerForm/registerForm";


const Auth: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const clickHandler = () => {
        setVisible(!visible);
    }
    return (
        <div>
            {visible
                ? <MyButton
                    className={'btn login-button'}
                    onClick={clickHandler}
                    visible={visible}>
                    Вход / Регистрация
                </MyButton>
                : <RegisterForm children={<MyButton
                    className={'btn form-button'}
                    onClick={clickHandler}
                    visible={true}>
                    X
                </MyButton>}/>
            }
        </div>
    );
};

export default Auth;
