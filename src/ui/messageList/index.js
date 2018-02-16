import React from 'react'
import PPic from '../../users/profilePic'

/* props
 *  messages: [Message]
 */

export default function({ messages }) {
    const messageComponents = messages.map(({message, user}, idx) => (
        <div className="opaque-message" key={idx}>
            <PPic user={user} />
            <span>{user.username}</span>
            <p>{message}</p>
        </div>
    ))

    return (
        <div className="opaque-ui-messagelist">
            {messageComponents}
        </div>
    )
}
