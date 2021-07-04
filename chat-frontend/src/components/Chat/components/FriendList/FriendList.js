import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Friend from '../Friend/Friend';
import { setCurrentChat } from '../../../../store/actions/chat';
import Modal from '../../../Modal/Modal';
import ChatService from '../../../../services/chatService';
import './FriendList.scss';

const FriendList = () => {

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats)

    const [showFriendsModal, setShowFriendsModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat))
    }

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
            .then(res => setSuggestions(res))
    }

    const addNewFriend = (id) => {
        // dispatch 
    }

    return (
        <div id='friends' className='shadow-light'>
            <div id='title'>
                <h3 className='m-0'>Друзья</h3>
                <button onClick={() => setShowFriendsModal(true)}>Новые</button>
            </div>

            <hr />

            <div id='friends-box'>
                {
                    chats.length > 0
                    ? chats.map(chat => {
                        return <Friend click={() => openChat(chat)} chat={chat} key={chat.id}/>
                    })
                    : <p id='no-chat'>У тебя нет друзей</p>
                }
            </div>
            {
                showFriendsModal &&
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key='header'>
                        <h3 className='m-0'>Создать новый чат</h3>
                    </Fragment>

                    <Fragment key='body'>
                        <p>Найти друзей:</p>
                        <input 
                            onInput={e => searchFriends(e)}
                            type='text'
                            placeholder='Поиск...'
                        />
                        <div id='suggestions'>
                            {
                                suggestions.map(user => {
                                    return <div key={user.id} className='suggestion'>
                                        <p className='m-0'>{user.firstName} {user.lastName}</p>
                                        <button onClick={() => addNewFriend(user.id)}>Добавить</button>
                                    </div>
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>
            }
        </div>
    )
}

export default FriendList