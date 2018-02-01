const express = require('express')
const session = require('express-session')
const Store = require('connect-redis')(session)
const secret = process.env.SESSION_SECRET 
    || require('../config/secret').secret

const router = express.Router()

const store = process.env.REDIS_URL 
    ? { url: process.env.REDIS_URL }
    : {
        ttl: 1209600, // 2 weeks
        host: 'localhost',
        port: 6379
    }

router.use(session({
    store: new Store(store),
    resave: true,
    saveUninitialized: true,
    secret
}))

module.exports = router
