const socketIo = require('socket.io');

const SockerServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            transports: ['websocket']
        }
    });

    io.on('connection', (socket) => {

    socket.on('join', async (user) => {     
            console.log('New user joined: ', user.firstName);

            io.to(socket.id).emit('typing', 'Пользователь набирает...')
        })
    })

}

module.exports = SockerServer