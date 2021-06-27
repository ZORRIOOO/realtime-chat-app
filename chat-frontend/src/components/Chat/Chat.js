import React from 'react';
import { useSelector } from 'react-redux';
 
const Chat = () => {

    const user = useSelector(state => state.authReducer.user)

    return (
        <div>
            <h1>Страница с чатом</h1>
            <p>Добро пожаловать, {user.firstName}</p>
        </div>
    );
}

export default Chat