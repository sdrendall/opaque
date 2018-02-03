const bcrypt = require('bcryptjs')
const pg = require('spiced-pg')
const DB_URL = process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : require('../config/local').DB_URL

const db = pg(DB_URL)

function rowToUser({ username, id, bio, ppic_url }) {
    return { username, id, bio, ppic_url }
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

function userGetter(column) {
    return function(value) {
        db.query(
            `SELECT * FROM users
                WHERE ${column} = $1
        `, [value])
    }
}

exports.getByUsername = userGetter('username')
exports.getByUserId = userGetter('id')

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

exports.updateProfilePic = (({ id, url }) => db.query(`
        UPDATE users
        SET ppic_url = $2
        WHERE id = $1
        RETURNING *
    `, [id, url]
))

exports.updateBio = (({ id, bio }) => db.query(`
        UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING *
    `, [id, bio]
))
