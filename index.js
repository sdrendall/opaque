const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const sessions = require('./backend/routes/sessions')
const portal = require('./backend/routes/portal')
const uploader = require('./backend/routes/uploader')

const app = express()
app.use(bodyParser({ extended: false }))
app.use(compression())
app.use(sessions)
app.use(portal)
app.use(uploader)

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

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(8080, function() {
    console.log("I'm listening.")
})
