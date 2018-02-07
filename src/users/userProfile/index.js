import React from 'react'

import PPic from '../profilePic'
import ClickableText from '../../ui/clickableText'
import './styles.scss'

/* props
 *  user: User
 *  openProfileEditor: () -> undefined
 */

export default function(props) {
    return (
        <div className='opaque-userprofile opaque-profile'>
            <PPic 
                user={props.user} 
                clickHandler={props.openProfileEditor}
            />
            <h1>{props.user.username}</h1>
            <div className="bio"> { props.user.bio ? (
                    <p> 
                        {props.user.bio}
                        <br /><br />
                        <ClickableText 
                            onClick={props.openProfileEditor}
                            text="edit profile"
                        />
                    </p>
                ) : (
                <span onClick={props.openProfileEditor}>
                    add a bio
                </span>
            )} </div>
        </div>
    )
}
