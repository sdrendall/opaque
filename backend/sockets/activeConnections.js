const { log, error } = require('../util/logger')

/* activeConnections maintains a list of socket.id, user object pairs */
let activeConnections = []

function containsSocket(connections, socket) {
    for (let i = 0; i < connections.length; i++) {
        if (connections[i].socketId == socket.id) {
            return true
        }
    }
    return false
}

module.exports = function(io) {
    io.on('connection', socket => {
        const session = socket.request.session
        if (!session || !session.user) {
            return socket.disconnect(true)
        }

        log(`socket connected! id: ${socket.id}`)

        activeConnections = [ ...activeConnections, {
                socketId: socket.id,
                user: session.user
            }
        ]

        io.sockets.emit('userConnected', {
            user: session.user,
            activeConnections
        })

        socket.on('disconnect', () => {
            const session = socket.request.session
            log(`socket disconnected! id: ${socket.id}`)

            activeConnections = activeConnections.filter(
                ({ socketId }) => socketId != socket.id
            )

            io.sockets.emit('userDisconnected', {
                user: session ? session.user : undefined,
                activeConnections
            })
        })

        socket.on('getActive', () => {
            socket.emit('activeConnections', { activeConnections })
        })
    })
}
