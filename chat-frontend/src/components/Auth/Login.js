import React from 'react';
import loginImage from '../../assets/images/login.svg';
import { Link } from 'react-router-dom';
 
import './Auth.scss'

const Login = () => {
    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>Добро пожаловать</h2>

                        <form>
                            <div className='input-field mb-1'>
                                <input placeholder='Почта' />
                            </div>  

                            <div className='input-field mb-2'>
                                <input placeholder='Пароль' />
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