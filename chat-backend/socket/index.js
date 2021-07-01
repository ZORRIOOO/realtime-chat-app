const socketIo = require('socket.io');

const SockerServer = (server) => {
    const io = socketIo(server)

    io.on('connection', (socket) => {

        socket.on('join', async (user) => {

            console.log('New user joined: ', user.firstName);
        })



    })

}

module.exports = SockerServer