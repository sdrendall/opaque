import React from 'react'

import './styles.scss'

/* props
 *  updateUser: () => undefined
 */

export default function(props) {
    return (
        <a className='opaque-logout' href='/portal/logout'>logout</a>
    )
}
