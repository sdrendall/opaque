const bcrypt = require('bcryptjs')
const pg = require('spiced-pg')
const DB_URL = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : require('../config/local').DB_URL

const db = pg(DB_URL)

function rowToUser({ username }) {
    return { username }
}

function registerUser(username, password) {
    return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash( password, salt ))
        .then(digest => db.query(
            `INSERT INTO users (username, digest)
                VALUES ($1, $2)
                RETURNING *
            `, [username, digest]
        ))
}

exports.testCredentials = ({ username, password }) => {
    return db
        .query(
            `SELECT * FROM users
                WHERE username = $1
            `, [username]
        )
        .then(({ rows }) => {
            if (rows.length == 1) {
                return bcrypt
                    .compare(password, rows[0].digest)
                    .then(res => res
                        ? {
                            result: 'loginSuccess',
                            user: rowToUser(rows[0])
                        }
                        : { result: 'loginFailure' }
                    )
            } else if (rows.length == 0) {
                return registerUser(username, password)
                    .then(({ rows }) => ({
                        result: 'newUser',
                        user: rowToUser(rows[0])
                    }))
            } else {
                throw "Something is very wrong!!!"
            }
        })
}
