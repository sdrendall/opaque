import React from 'react'
import axios from 'axios'

import './styles.scss'

/* props
 *  updateUser: () => undefined
 */

export default function(props) {
    return (
        <span 
            className='opaque-logout'
            onClick={() => {
                axios
                    .get('/portal/logout')
                    .then(({ status, data }) => {
                        console.log(data)
                        if (status != 200) {
                            alert(`logout request failed with status code ${status}`)
                        } else if (data.success) {
                            props.updateUser(undefined)
                        } else {
                            alert(`logout failed due to server error!`)
                        }
                    })
            }}
        >logout</span>
    )
}
