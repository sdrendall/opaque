const express = require('express')
const path = require('path')
const compression = require('compression')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const portal = require('./backend/routes/portal')
const uploader = require('./backend/routes/uploader')
const friends = require('./backend/routes/friends')
const { log, error } = require('./backend/util/logger')
const PORT = process.env.PORT || require('./backend/config/local').PORT

const app = express()
const server = require('http').Server(app)

// Session config
const session = require('express-session')
const Store = require('connect-redis')(session)
const sessionSecret = process.env.SESSION_SECRET 
    || require('./backend/config/secret').secret

const storeConfig = process.env.REDIS_URL 
    ? { url: process.env.REDIS_URL }
    : {
        ttl: 1209600, // 2 weeks
        host: 'localhost',
        port: 6379
    }

const sessionMiddleware = session({
    store: new Store(storeConfig),
    //resave: true,
    //saveUninitialized: true,
    secret: sessionSecret
})

// Socket.io config
const io = require('socket.io')(server)
io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
})
io.use((socket, next) => {
    const session = socket.request.session
    if (!session || !session.user) {
        return socket.disconnect(true)
    } else {
        console.log(`${session.user.username} connected a socket!`)
        next()
    }
})
require('./backend/sockets/greetings')(io)
require('./backend/sockets/activeConnections')(io)
require('./backend/sockets/messaging')(io)

app.io = io // Allows access to socket io in routes

app.use(sessionMiddleware)

// Data flow and logging
app.use((req, res, next) => {
    log(`${req.method} request to ${req.url}`)
    next()
})

app.use(bodyParser({ extended: false }))
app.use(compression())

// csurf protection. requires use of ~/src/network/axios.js
app.use(csurf())
app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken())
    next()
})

// Routes
app.use(uploader)
app.use('/portal', portal)
app.use('/friends', friends)

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    )
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`))
}

app.use('/assets', express.static(path.resolve(__dirname, 'assets')))

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})


server.listen(PORT, function() {
    console.log(`sup bitches,, listening on ${PORT}`)
})
