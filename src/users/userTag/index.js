import React from 'react'

import PPic from '../profilePic'
import './styles.scss'

export default function(props) {
    const { user, clickHandler } = props
    return (
        <div 
            className="opaque-usertag"
            onClick={clickHandler || (x => x)}
        >
            <PPic {...props} />
            {user.username}
        </div>
    )
}
