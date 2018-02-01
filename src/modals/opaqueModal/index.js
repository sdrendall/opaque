import React from 'react'

export default function(Content) {
    return function({ close, ...contentProps }) {
        return (
            <div 
                className="opaque-modal"
                onClick={close}
            >
                <Content {...contentProps} />
            </div>
        )
    }
}
