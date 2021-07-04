import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message/Message';
import './MessageBox.scss';

const MessageBox = ({ chat }) => {

    const user = useSelector(state => state.authReducer.user)
    const scrollBottom = useSelector(state => state.chatReducer.scrollBottom)
    const senderTyping = useSelector(state => state.chatReducer.senderTyping)
    const msgBox = useRef()

    const scrollManual = (value) => {
        msgBox.current.scrollTop = value
    }

    // Порядок методов, которые были пропущены из-за ошибки с ключами: scrollTop, senderTyping, scrollBottom
    // Также нужно будут убрать Math.ceil из senderTyping

    useEffect(() => {
        setTimeout(() => {
            scrollManual(msgBox.current.scrollHeight)
        }, 100)
    }, [scrollBottom])

    return (
        <div id='msg-box' ref={msgBox}>
            {
                chat.Messages.map((message, index) => {
                    return <Message 
                        user={user}
                        chat={chat}
                        message={message}
                        index={index}
                        key={message.id}
                    />
                })
            }
            {
                senderTyping.typing && senderTyping.chatId === chat.id
                    ? <div className='message'>
                        <div className='other-person'>
                            <p className='m-0'>{senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName} печатает...</p>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default MessageBox