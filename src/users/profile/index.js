import React from 'react'

import PPic from '../profilePic'
import './styles.scss'

/* props
 *  user: User
 *  openProfileEditor: () -> undefined
 */

export default function(props) {
    return (
        <div className='opaque-profile'>
            <PPic 
                user={props.user} 
                openProfileEditor={props.openProfileEditor}
            />
            <h1>{props.user.username}</h1>
            <div className="bio"> { props.user.bio ? (
                    <p> {props.user.bio} </p>
                ) : (
                <a href='#' onClick={props.openProfileEditor}>
                add a bio
                </a>
            )} </div>
        </div>
    )
}
