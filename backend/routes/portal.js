const express = require('express')
const accounts = require('../models/accounts')
const logger = require('../util/logger')

const router = express.Router()

router.get('/user', (req, res) => {
    res.json({ user: req.session.user })
})

router.post('/login', (req, res) => {
    logger.log(`Login request for user ${req.body.username}`)
    accounts
        .testCredentials(req.body)
        .then(({ result, user }) => {
            logger.log(`Login result for user ${user.username}: ${result}`)
            switch (result) {
                case 'loginFailure':
                    res.json({
                        msg: `bad credentials`,
                        user: null,
                    })
                    break;
                case 'loginSuccess':
                    req.session.user = user
                    res.json({
                        msg: `welcome back ${user.username}`,
                        user,
                    })
                    break;
                case 'newUser':
                    req.session.user = user
                    res.json({
                        msg: `welcome to opaQue ${user.username}`,
                        user,
                    })
                    break;
            }

        })
})

router.all('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            logger.error(err, req)
            res.json({success: false})
        } else {
            res.json({success: true})
        }
    })
})

module.exports = router
