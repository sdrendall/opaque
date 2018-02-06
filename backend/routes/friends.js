const express = require('express')
const logger = require('../util/logger')
const friends = require('../models/friends')

const router = express.Router()

/* friendship statues:
 *  1: requested
 *  2: accepted
 *  3: rejected
 *  4: cancelled
 *  5: terminated
 */


router.get('/check/:id', (req, res) => {
    friends
        .check({ 
            user_id: req.session.user.id,
            target_id: req.params.id
        })
        .then(({ rows }) => {
            if (rows.length < 1) {
                res.json({ 
                    user1_id: req.session.user.id,
                    user2_id: req.params.id,
                    status: 'not friends'
                })
            } else {
                res.json(rows[0])
            }
        })
        .catch(error => logger.error(error))
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

router.get('/:action/:id', (req, res, next) => {
    const user_id = req.session.user.id
    const target_id = req.params.id
    const action = req.params.action
    
    if (action in availableActions) {
        friends
            [action]({ user_id, target_id })
            .then(({ rows }) => res.json(rows[0]))
            .catch(error => logger.error(error))
    } else {
        next()
    }
})
