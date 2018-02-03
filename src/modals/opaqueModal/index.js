import React from 'react'
import './styles.scss'

export default function(Content) {
    return function({ close, ...contentProps }) {
        return (
            <div 
                className="opaque-modal"
                onClick={close}
            >
                <div onClick={e => e.stopPropagation()}>
                    <Content 
                        {...contentProps}
                    />
                </div>
            </div>
        )
    }
}
