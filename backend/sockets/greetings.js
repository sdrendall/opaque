module.exports = function(io) {
    io.on('connection', socket => {
        io.sockets.emit('welcome', {
            message: 'sup'
        })
    })
}
