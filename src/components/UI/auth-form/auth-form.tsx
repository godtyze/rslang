import React, {useEffect, useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input} from 'antd';
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";
import {useActions} from "../../../hooks/useActions";
import './auth-form.css';
import {RouteNames} from "../../../consts/consts";


const AuthForm: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === RouteNames.login;
  const {isLoading, error} = useAppSelector(state => state.userReducer);
  const {signIn, createUser, setUserError} = useActions();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    return () => {
      setUserError('');
    };
  }, []);
  const onFinish = () => {
    if (isLoginPage) {
      signIn({email, password});
    } else {
      createUser({email, password});
    }
  };

  return (
    <div className='form-wrapper'>
      <Card>
        <Form
          name='normal_login'
          className='login-form'
          onFinish={onFinish}
          size='large'
        >
          {error && <div style={{color: 'red', fontSize: '15px'}}>{error}</div>}
          <Form.Item
            name='e-mail'
            rules={[
              {required: true, message: 'E-mail не может быть пустым!'},
              {whitespace: true, message: 'E-mail не может быть пустым!'},
              {type: 'email', message: 'Некорректный E-mail!'}
            ]}
            hasFeedback
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder='E-mail'
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {required: true, message: 'Пароль не может быть пустым!'},
              {min: 8, message: 'Пароль не может быть короче 8 символов!'}
            ]}
            hasFeedback
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined className="site-form-item-icon"/>}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            {isLoginPage
              ? <span className='form-text'>Нет аккаунта? <Link to='/register' onClick={() => setUserError('')}>Зарегестрируйтесь!</Link></span>
              : <span className='form-text'>Есть аккаунт? <Link to='/login' onClick={() => setUserError('')}>Войдите!</Link></span>
            }
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button' loading={isLoading}>
              {isLoginPage
                ? 'Войти'
                : 'Регистрация'
              }
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;