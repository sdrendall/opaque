const pg = require('spiced-pg')
const DB_URL = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : require('../config/local').DB_URL

const db = pg(DB_URL)

/* friendship statues:
 *  1: requested
 *  2: accepted
 *  3: rejected
 *  4: cancelled
 *  5: terminated
 */

exports.check = ({ user_id, target_id }) => db.query(`
    SELECT * 
    FROM friendships
    WHERE ( user1_id = $1 AND user2_id = $2 )
      OR  ( user1_id = $2 AND user2_id = $1 )
    ORDER BY created_at DESC
`, [user_id, target_id])

exports.request = ({ user_id, target_id }) => this
    .check({ user_id, target_id })
    .then(({ rows }) => (rows.length < 1) ? (
        db.query(`
                    INSERT INTO friendships (user1_id, user2_id, status)
                    VALUES ($1, $2, 'requested')
                    RETURNING *
                `, [user_id, target_id])
    ) : (
        db.query(`
                    UPDATE friendships
                    SET user1_id = $1, user2_id = $2, status = 'requested'
                    WHERE ( user1_id = $1 AND user2_id = $2 )
                      OR  ( user1_id = $2 AND user2_id = $1 )
                    RETURNING *
                `, [user_id, target_id])
    ))

exports.accept = ({ user_id, target_id }) => db.query(`
    UPDATE friendships
    SET status = 'accepted'
    WHERE (user1_id = $2 AND user2_id = $1)
    RETURNING *
`, [user_id, target_id])

exports.reject = ({ user_id, target_id }) => db.query(`
    UPDATE friendships
    SET status = 'rejected'
    WHERE (user1_id = $2 AND user2_id = $1)
    RETURNING *
`, [user_id, target_id])

exports.cancel = ({ user_id, target_id }) => db.query(`
    UPDATE friendships
    SET status = 'cancelled'
    WHERE (user1_id = $1 AND user2_id = $2)
    RETURNING *
`, [user_id, target_id])

exports.terminate = ({ user_id, target_id }) => db.query(`
    UPDATE friendships
    SET status = 'terminated'
    WHERE (user1_id = $1 AND user2_id = $2)
      OR  (user1_id = $2 AND user1_id = $1)
    RETURNING *
`, [user_id, target_id])
