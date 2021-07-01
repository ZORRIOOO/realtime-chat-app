const socketIo = require('socket.io');
const { sequelize } = require('../models');

const users = new Map()

const SockerServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            transports: ['websocket']
        }
    });

    io.on('connection', (socket) => {

    socket.on('join', async (user) => {     

            let sockets = []

            if (users.has(user.id)) {
                const existingUser = users.get(user.id)
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
                users.set(user.id, existingUser)
                sockets = [...existingUser.sockets, ...[socket.id]]
            } else {
                users.set(user.id, {id: user.id, sockets: [socket.id]})
                sockets.push(socket.id)
            }

            const onlineFriends = [] // Массив id пользователей

            const chatters = await getChatters(user.id) // Запрос пользователей, которые сейчас в сети

            console.log(chatters);

            // Уведомить друзей пользователя о том, что он сейчас в сети
            for (let i = 0; i < chatters.length; i++) {
                if (users.has(chatters[i]).id) {
                    const chatter = users.get(chatters[i])
                    chatters.sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('online', user)
                        } catch (e) { }
                        onlineFriends.push(chatter.id)
                    })
                }
            }

            // Отправить пользователю через socket кто из друзей сейчас в сети
            sockets.forEach(socket => {
                try {
                    io.to(socket).emit('friends', onlineFriends)
                } catch (e) { }
            })
        })
    })

}

// Запрос к БД 

const getChatters = async (userId) => {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT "cu"."userId" FROM "ChatUsers" AS cu
            INNER JOIN (
                SELECT "c"."id" FROM "Chats" AS c
                WHERE exists (
                    SELECT "u"."id" FROM "Users" AS u
                    INNER JOIN "ChatUsers" ON u.id = "ChatUsers"."userId"
                    WHERE u.id = ${parseInt(userId)} AND c.id = "ChatUsers"."chatId"
                )
            ) AS cjoin ON cjoin.id = "cu"."chatId"
            WHERE "cu"."userId" != ${parseInt(userId)}
        `)

        return results.length > 0 ? results.map(el => el.userId) : []

    } catch (e) {
        console.log(e);
        return []
    }
}

module.exports = SockerServer