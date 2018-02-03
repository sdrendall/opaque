import React from 'react'

import Logo from '../../aesthetic/logo'
import LoginForm from '../../forms/login'

import './styles.scss'

/* props
 *  updateUser: User => null
 */

export default function(props) {
    return (
        <div className='opaque-page-login'>
            <Logo />
            <LoginForm updateUser={props.updateUser} />
        </div>
    )
}
