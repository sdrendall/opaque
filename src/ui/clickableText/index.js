import React from 'react'

import './styles.scss'

export default function(props) {
    return (
        <span 
            className='opaque-ui-clickabletext' 
            onClick={props.onClick}
        >
            {props.text}
        </span>
    )
}
