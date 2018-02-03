import React from 'react'

import PPic from '../profilePic'
import './styles.scss'

export default function(props) {
    const { user, openProfileEditor } = props
    return (
        <div 
            className="opaque-usertag"
            onClick={openProfileEditor}
        >
            <PPic {...props} />
            {user.username}
        </div>
    )
}
