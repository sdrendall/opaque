const express = require('express')
const logger = require('../util/logger')
const friendships = require('../models/friendships')

const router = express.Router()

/* friendship statues:
 *  1: requested
 *  2: accepted
 *  3: rejected
 *  4: cancelled
 *  5: terminated
 */

router.get('/all', (req, res) => {
    friendships
        .getAllFriends(req.session.user.id)
        .then(({ rows }) => {
            res.json({ friends: rows })
        })
        .catch(error => {
            logger.error(error)
            res.status(500).send('Server Failure!')
        })
})


router.get('/check/:id', (req, res) => {
    friendships
        .check({ 
            user_id: req.session.user.id,
            target_id: req.params.id
        })
        .then(({ rows }) => {
            if (rows.length < 1) {
                res.json({ 
                    friendship: { 
                        user1_id: req.session.user.id,
                        user2_id: req.params.id,
                        status: 'not friends'
                    }
                })
            } else {
                res.json({ friendship: rows[0] })
            }
        })
        .catch(error => {
            logger.error(error)
            res.status(500).send('Server Failure!')
        })
})

/* handles the following:
 *  accept
 *  reject
 *  request
 *  cancel
 *  terminate
 */

const availableActions = [
    'accept',
    'reject',
    'request',
    'cancel',
    'terminate'
]

router.post('/:action/:id', (req, res, next) => {
    const user_id = req.session.user.id
    const target_id = req.params.id
    const action = req.params.action
    
    if (availableActions.includes(action)) {
        friendships
            [action]({ user_id, target_id })
            .then(({ rows }) => res.json({ 
                friendship: rows[0]
            }))
            .catch(error => console.log(error))
    } else {
        logger.log(`Encountered unknown friend action ${action}`)
        next()
    }
})

module.exports = router
