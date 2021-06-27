import React from 'react';
import loginImage from '../../assets/images/login.svg';
 
const Login = () => {
    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>Допро пожаловать</h2>

                        <form>
                            <div className='imput-field'>
                                <input placeholder='Почта' />
                            </div>  

                            <div className='imput-field'>
                                <input placeholder='Пароль' />
                            </div>  

                            <button>Войти</button>
                        </form>

                        <p>Ещё нет аккаунта? Регистрация</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login