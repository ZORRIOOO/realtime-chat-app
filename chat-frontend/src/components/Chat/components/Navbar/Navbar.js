import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { logout } from '../../../../store/actions/auth';
import Modal from '../../../Modal/Modal';
import './Navbar.scss';

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        const form = { firstName, lastName, email, gender, password, avatar }

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }

        // dispatch

    }

    return (
        <div id='navbar' className='card-shadow'>
            <h2>Чат</h2>
            <div onClick={() => setShowProfileOptions(!showProfileOptions)} id='profile-menu'>
                <img width='40' height='40' src={user.avatar} alt='Avatar'/>
                <p>{user.firstName} {user.lastName}</p>
                <FontAwesomeIcon icon='caret-down' className='fa-icon'/>

                {
                    showProfileOptions &&
                    <div id='profile-options'>
                        <p onClick={() => setShowProfileModal(true)}>Профиль</p>
                        <p onClick={() => dispatch(logout())}>Выйти</p>
                    </div>
                }

                {
                    showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}>

                        <Fragment key='header'>
                            <h3 className='m-0'>Профиль</h3>
                        </Fragment>

                        <Fragment key='body'>
                            <form>
                                <div className='input-field mb-1'>
                                    <input 
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    required='requierd'
                                    type='text'
                                    placeholder='Имя' />
                                </div> 

                                <div className='input-field mb-1'>
                                    <input 
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    required='requierd'
                                    type='text'
                                    placeholder='Фамилия' />
                                </div> 

                                <div className='input-field mb-1'>
                                    <input 
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='requierd'
                                    type='text'
                                    placeholder='Почта' />
                                </div>  

                                <div className='input-field mb-1'>
                                    <select
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    required='requierd'>
                                        <option value='male'>Мужчина</option>
                                        <option value='female'>Женщина</option>
                                    </select>
                                </div> 

                                <div className='input-field mb-2'>
                                    <input 
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='requierd'
                                    type='password'
                                    placeholder='Пароль' />
                                </div>

                                <div className='input-field mb-2'>
                                    <input 
                                    onChange={e => setAvatar(e.target.files[0])}
                                    type='file'/>
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key='footer'>
                            <button className='btn-success'>Новый</button>                            
                        </Fragment>       

                    </Modal>
                }
            
            </div>
        </div>
    );
}

export default Navbar