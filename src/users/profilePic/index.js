import React from 'react'
import './styles.scss'

/* props -- subset of User
 *   user: User
 *   openProfileEditor: () => undefined
 */

export default function({user, openProfileEditor}) {
    return (
        <div 
            className="opaque-ppic"
            onClick={openProfileEditor}
        >
            <img 
                src={user.ppic_url}
                alt={user.username}
            />
        </div>
    )
}
