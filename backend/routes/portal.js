const express = require('express')
const accounts = require('../models/accounts')
const logger = require('../util/logger')

const router = express.Router()

router.get('/user', (req, res) => {
    if (req.session.user) {
        accounts
            .getByUserId(req.session.user.id)
            .then(user => {
                res.json({ user })
            })
            .catch(error => logger.error(error))
    } else {
        res.json({ user: undefined })
    }
})

router.get('/user/:id', (req, res) => {
    accounts
        .getByUserId(req.params.id)
        .then(user => {
            res.json({ user })
        })
        .catch(error => logger.error(error))
})

router.post('/updateBio', (req, res) => {
    accounts
        .updateBio({
            id: req.session.user.id,
            bio: req.body.bio
        })
        .then(user => {
            if (user) {
                res.json({
                    success: true,
                    user
                })
            } else {
                res.json({
                    success: false,
                    reason: 'user not found!'
                })
            }
        })
        .catch(error => { 
            res.json({
                success: false,
                reason: 'database error!'
            })
            logger.error(error) 
        })
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
                        user: undefined,
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
            logger.log(`Error on logout: ${err}`)
        }
    })
    res.redirect('/')
})

module.exports = router
