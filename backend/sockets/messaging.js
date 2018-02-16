/*
const redis = require('redis')
const redisConfig = (process.env.REDIS_URL) ? ({
    url : process.env.REDIS_URL 
}) : ({
    ttl: 1209600, // 2 weeks
    host: 'localhost',
    port: 6379
})   

const client = redis.createClient(redisConfig)
*/

module.exports = function(io) {
    io.on('connection', socket => {
        const user = socket.request.session.user

        socket.on('messageGlobal', ({ message, anonymous }) => {
            console.log('message received!')
            console.log(message)
            io.sockets.emit('newGlobalMessage', {
                message,
                user: anonymous ? ({
                    username: 'anonymous',
                    ppic_url: ''
                }) : (
                    user
                )
            })
        })
    })
}
