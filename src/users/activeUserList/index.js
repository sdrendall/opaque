import React from 'react'
import { Link } from 'react-router-dom'
import _axios from '../../network/axios'
import UserTag from '../userTag'

import { connect } from 'react-redux'

function containsUser(users, user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == user.id) {
            return true
        }
    }
    return false
}

function mapStateToProps({ activeConnections }) {
    activeConnections = activeConnections || []
    let activeUsers = activeConnections
        .map(({ user }) => user)
        .filter(user => user) // remove connections wo a user
        .reduce((users, user) => // remove duplicate users
            containsUser(users, user) ? users : [ ...users, user ], 
            []
        )     
    return { activeUsers }
}

export default connect(mapStateToProps)
(function({ activeUsers }) {
    const userTags = activeUsers.map(user => (
        <Link key={user.id} to={`/user/${user.id}`}>
            <UserTag user={user}/>
        </Link>
    ))

    return (
        <div className="opaque-users-activeuserlist">
            {userTags}
        </div>
    )
})
