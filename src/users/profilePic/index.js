import React from 'react'
import { Link } from 'react-router-dom'
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
        { clickHandler ? (
            <img 
                src={user.ppic_url || '../../../assets/defaultPPic.gif'}
                alt={user.username}
            />
        ) : (
            <Link to={`/user/${user.id}`}>
                <img 
                    src={user.ppic_url || '../../../assets/defaultPPic.gif'}
                    alt={user.username}
                />
            </Link>
        )
        }
        </div>
    )
}
