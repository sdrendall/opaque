import React from 'react'
import _axios from '../../network/axios'
import ClickableText from '../clickableText'

import { connect } from 'react-redux'
import { acceptRequest, rejectRequest } from '../../redux/actions'

/* props
 *  user: User
 *  friendId: id
 */


export default connect()
(class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }

        this.activate = this.activate.bind(this)
        this.deactivate = this.deactivate.bind(this)
    }

    activate() {
        this.setState({ active: true })
    }

    deactivate() {
        this.setState({ active: false })
    }

    render() {
        const { dispatch, friendId } = this.props
        return (
            <div 
                className="opqaue-responsebutton"
                onMouseLeave={this.deactivate}
            >
            { this.state.active ? (
                <div className="opqaue-responsebutton-responses">
                    <button 
                        type='button' 
                        onClick={() => dispatch(acceptRequest(friendId))}
                    >
                        accept
                    </button>
                    <button 
                        type='button' 
                        onClick={() => dispatch(rejectRequest(friendId))}
                    >
                        reject
                    </button>
                </div>
            ) : (
                <ClickableText 
                    text='pending request' 
                    onClick={this.activate} 
                />
            )}
            </div>
    )}
})
