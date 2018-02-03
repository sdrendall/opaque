const express = require('express')
const path = require('path')
const compression = require('compression')
const bodyParser = require('body-parser')
const sessions = require('./backend/routes/sessions')
const portal = require('./backend/routes/portal')
const uploader = require('./backend/routes/uploader')
const { log, error } = require('./backend/util/logger')

const app = express()

app.use((req, res, next) => {
    log(`${req.method} request to ${req.url}`)
    next()
})

// csurf protection. requires use of ~/src/network/axios.js
app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken())
    next()
})

app.use(bodyParser({ extended: false }))
app.use(compression())
app.use(sessions)
app.use(uploader)
app.use('/portal', portal)

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

app.get('/welcome', (req, res) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

app.get('*', function(req, res) {
    if (!req.session.user) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})


app.listen(8080, function() {
    console.log("I'm listening.")
})
