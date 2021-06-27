import React from 'react';
import registerImage from '../../assets/images/register.svg';
import { Link } from 'react-router-dom';
 
import './Auth.scss'
const Register = () => {
    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={registerImage} alt='Register' />
                    </div>

                    <div id='form-section'>
                        <h2>Новый аккаунт</h2>

                        <form>
                            <div className='input-field mb-1'>
                                <input placeholder='Имя' />
                            </div> 

                            <div className='input-field mb-1'>
                                <input placeholder='Фамилия' />
                            </div> 

                            <div className='input-field mb-1'>
                                <input placeholder='Почта' />
                            </div>  

                            <div className='input-field mb-1'>
                                <select>
                                    <option value='male'>Мужчина</option>
                                    <option value='female'>Женщина</option>
                                    <option value='other'>Другой</option>
                                </select>
                            </div> 

                            <div className='input-field mb-2'>
                                <input placeholder='Пароль' />
                            </div>  

                            <button>Создать</button>
                        </form>

                        <p>Уже есть аккаунт? <Link to='/login'>Войти</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register