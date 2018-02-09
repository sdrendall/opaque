import React from 'react'
import './styles.scss'

/* props -- subset of User
 *   user: User
 *   clickHandler: () => undefined
 */

export default function({user, clickHandler}) {

    return (
        <div 
            className="opaque-ppic"
            onClick={clickHandler || (x => x)}
        >
            <img 
                src={user.ppic_url || '../../../assets/defaultPPic.gif'}
                alt={user.username}
            />
        </div>
    )
}
