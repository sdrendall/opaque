import React from 'react'
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
        .sort((u1, u2) => { 
            const username1 = u1.username
            const username2 = u2.username
            return (username1
                .toLowerCase()
                .localeCompare(username2.toLowerCase())
            )}
        )
    return { activeUsers }
}

export default connect(mapStateToProps)
(function({ activeUsers }) {
    const userTags = activeUsers.map(user => (
        <UserTag key={user.id} user={user}/>
    ))

    return (
        <div className="opaque-users-activeuserlist">
            {userTags}
        </div>
    )
})
