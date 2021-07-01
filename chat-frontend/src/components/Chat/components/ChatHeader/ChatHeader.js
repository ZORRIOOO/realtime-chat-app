import React, { Fragment, useState } from 'react';
import { userStatus } from '../../../../utils/helpers';
import './ChatHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatHeader = ({chat}) => {

    const [showChatOptions, setShowChatOptions] = useState(false)
    const [showAddFriendModal, setShowAddFriendModal] = useState(false)
    const [showLeaveChatModal, setShowLeaveChatModal] = useState(false)
    const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)

    return (
        <Fragment>
            <div id='chatter'>
                {
                    chat.Users.map(user => {
                        return <div className='chatter-info'>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <div className='chatter-status'>
                                <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    })
                }
            </div>
            <FontAwesomeIcon 
                onClick={() => setShowChatOptions(!showChatOptions)}
                icon={'fas', 'ellipsis-v'}
                className='fa-icon'
            />
            {
                showChatOptions
                ? <div id='settings'>
                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'user-plus']}
                            className='fa-icon'
                        />
                        <p>Добавить пользователя в чат</p>
                    </div>

                    {
                        chat.type === 'group'
                            ? <div>
                                <FontAwesomeIcon 
                                    icon={['fas', 'sign-out-alt']}
                                    className='fa-icon'
                                />
                                <p>Покинуть чат</p>
                            </div>
                            : null
                    }

                    <div>
                        <FontAwesomeIcon 
                            icon={['fas', 'trash']}
                            className='fa-icon'
                        />
                        <p>Удалить чат</p>
                    </div>
                </div>
                : null
            }
        </Fragment>
    )
}

export default ChatHeader