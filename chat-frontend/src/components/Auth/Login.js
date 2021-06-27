import React, {useState} from 'react';
import loginImage from '../../assets/images/login.svg';
import { Link } from 'react-router-dom';
//import axios from 'axios'; 
//import AuthService from '../../services/authService';

import {useDispatch} from 'react-redux';
import {login} from '../../store/actions/auth';

import './Auth.scss'

const Login = ({ history }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('max.schneider@gmail.com')
    const [password, setPassword] = useState('secret')
    
    const submitForm = (e) => {
        e.preventDefault()

        dispatch(login({ email, password }, history))

        // props.history

        //AuthService.login({ email, password }).then(res => console.log(res))
        /* axios.post('http://127.0.0.1:3000/login', { email, password })
            .then(res => {
                console.log('res', res);
            })
            .catch(err => {
                console.log('err', err);
            }) */


        //console.log({ email, password });
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>Добро пожаловать</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input 
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                required='requierd'
                                type='text'
                                placeholder='Почта' />
                            </div>  

                            <div className='input-field mb-2'>
                                <input 
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required='requierd'
                                type='password'
                                placeholder='Пароль' />
                            </div>  

                            <button>Войти</button>
                        </form>

                        <p>Ещё нет аккаунта? <Link to='/register'>Регистрация</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login