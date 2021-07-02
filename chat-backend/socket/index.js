const socketIo = require('socket.io');
const {sequelize} = require('../models')
const users = new Map() // Collection, witch allows us to set key-value pairs 

const SockerServer = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*'
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

            const onlineFriends = [] // Массив id

            const chatters = await getChatters(user.id) // Запрос

            console.log(chatters);

            // Уведомить друзей о том, что пользователь в сети
            for (let i = 0; i < chatters.length; i++) {
                if (users.has(chatters[i])) {
                    const chatter = users.get(chatters[i])
                    chatters.sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('online', user)
                        } catch (e) {}
                    })
                    onlineFriends.push(chatter.id)
                }
            }

            // Отправить пользователю через Socket, кто из его друзей в сети
            sockets.forEach(socket => {
                try {
                    io.to(socket).emit('friends', onlineFriends)
                } catch (e) {}
            })
        })
    })
}

const getChatters = async (userId) => {
    try {
        // Запрос для нахождения всех пользователей, с которорыми мы общаемся
        const [results, metadata] = await sequelize.query(`
            select "cu"."userId" from "ChatUsers" as cu
            inner join (
                select "c"."id" from "Chats" as c
                where exists (
                    select "u"."id" from "Users" as u
                    inner join "ChatUsers" on u.id = "ChatUsers"."userId"
                    where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
                )
            ) as cjoin on cjoin.id = "cu"."chatId"
            where "cu"."userId" != ${parseInt(userId)}
        `)

        return results.length > 0 ? results.map(el => el.userId) : []

    } catch (e) {
        console.log(e);
        return []
    }
}

module.exports = SockerServer